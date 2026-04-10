import { useState, useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import api from '../services/api';

const MoodSelector = ({ setTasks }) => {
  const [selectedMood, setSelectedMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(null); // null, 'manual', or 'camera'
  const [cameraActive, setCameraActive] = useState(false);
  
  // New State for User Context
  const [userContext, setUserContext] = useState('');
  const [isProfileSet, setIsProfileSet] = useState(false);

  const videoRef = useRef();
  const canvasRef = useRef();

  // Load models when component mounts
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        console.log('Face-API models loaded');
      } catch (err) {
        console.error("Failed to load models:", err);
      }
    };
    loadModels();
  }, []);

  // Reset loading state when camera is stopped or mode changes
  useEffect(() => {
    if (!cameraActive && mode === 'camera') {
      setLoading(false);
    }
  }, [cameraActive, mode]);

  const moods = ['Happy', 'Sad', 'Angry', 'Anxious', 'Calm', 'Tired'];

  // Handle Profile Submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (userContext.trim().length > 0) {
      setIsProfileSet(true);
    } else {
      alert("Please tell us a bit about yourself first!");
    }
  };

  // Handle Manual Selection
  const handleManualSelect = async (mood) => {
    setSelectedMood(mood);
    await getRecommendations(mood);
  };

  // Start Camera
  const startVideo = async () => {
    setCameraActive(true);
    setLoading(false); // Ensure loader is off when starting
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please allow permissions.");
      setCameraActive(false);
    }
  };

  // Stop Camera
  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setLoading(false); // Reset loading when cancelling
  };

  // Detect Mood from Camera
  const detectMood = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setLoading(true); // Show loader
    
    // Small delay to ensure UI updates before heavy processing
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      // Wait for video to be ready
      if (videoRef.current.readyState !== 4) {
        await new Promise((resolve) => {
          videoRef.current.onloadedmetadata = resolve;
        });
      }

      const displaySize = { 
        width: videoRef.current.videoWidth, 
        height: videoRef.current.videoHeight 
      };
      
      faceapi.matchDimensions(canvasRef.current, displaySize);

      // Detect faces and expressions
      const detections = await faceapi.detectAllFaces(
        videoRef.current, 
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceExpressions();

      if (detections.length > 0) {
        // Get the dominant expression
        const expressions = detections[0].expressions;
        const dominantMood = Object.keys(expressions).reduce((a, b) => 
          expressions[a] > expressions[b] ? a : b
        );

        // Map face-api labels to our app's moods
        let mappedMood = dominantMood.charAt(0).toUpperCase() + dominantMood.slice(1); 
        if (dominantMood === 'fearful') mappedMood = 'Anxious';
        if (dominantMood === 'disgusted') mappedMood = 'Angry';
        if (dominantMood === 'surprised') mappedMood = 'Happy'; 

        setSelectedMood(mappedMood);
        
        // Call API
        await getRecommendations(mappedMood);
        
        // Stop camera after detection SUCCESSFULLY
        stopVideo();
      } else {
        alert("No face detected. Please ensure your face is visible and well-lit.");
        setLoading(false); // Reset loader if no face found
      }
    } catch (error) {
      console.error("Detection error:", error);
      alert("Error detecting mood. Please try again.");
      setLoading(false);
    }
  };

  // Common function to call Backend AI
  const getRecommendations = async (mood) => {
    setLoading(true);
    try {
      // Send BOTH mood and userContext to backend
      const { data } = await api.post('/mood/recommend', { 
        mood, 
        context: userContext 
      });
      setTasks(data.tasks);
    } catch (err) {
      console.error(err);
      alert('Failed to get recommendations');
    } finally {
      // THIS IS CRITICAL: Always reset loading when done
      setLoading(false);
    }
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => stopVideo();
  }, []);

  // --- RENDER: Profile Setup Screen ---
  if (!isProfileSet) {
    return (
      <div className="profile-setup">
        <h3>Welcome to MoodMate! 👋</h3>
        <p>To give you the best task recommendations, tell us a bit about yourself.</p>
        <p className="sub-text">(e.g., "I am a software student," "I work in marketing," "I am a freelancer")</p>
        
        <form onSubmit={handleProfileSubmit}>
          <textarea
            placeholder="Describe your profession or current role..."
            value={userContext}
            onChange={(e) => setUserContext(e.target.value)}
            rows="3"
            required
          />
          <button type="submit" className="primary-btn">Continue</button>
        </form>
      </div>
    );
  }

  // --- RENDER: Mood Selector Screen ---
  return (
    <div className="mood-selector">
      <div className="user-info-banner">
        <span>👤 Context: <strong>{userContext}</strong></span>
        <button onClick={() => setIsProfileSet(false)} className="edit-btn">Edit</button>
      </div>

      <h3>How are you feeling right now?</h3>

      {/* Mode Switcher Tabs */}
      <div className="mode-switcher">
        <button 
          className={mode === 'manual' ? 'active-tab' : ''} 
          onClick={() => { setMode('manual'); stopVideo(); }}
        >
          😊 Manual Select
        </button>
        <button 
          className={mode === 'camera' ? 'active-tab' : ''} 
          onClick={() => { setMode('camera'); startVideo(); }}
        >
          📷 Camera Detect
        </button>
      </div>

      {/* Manual Mode Content */}
      {mode === 'manual' && (
        <div className="mood-buttons">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => handleManualSelect(mood)}
              className={selectedMood === mood ? 'active' : ''}
              disabled={loading} // Disable while loading
            >
              {loading && selectedMood === mood ? '⏳ Processing...' : mood}
            </button>
          ))}
        </div>
      )}

      {/* Camera Mode Content */}
      {mode === 'camera' && (
        <div className="camera-section">
          {!cameraActive ? (
            <div className="loader-container">
              <div className="spinner"></div>
              <p>Starting camera...</p>
            </div>
          ) : (
            <div className="video-container">
              <video 
                ref={videoRef} 
                autoPlay 
                muted 
                playsInline
              />
              <canvas 
                ref={canvasRef} 
                style={{ position: 'absolute', top: 0, left: 0 }} 
              />
              <div className="camera-controls">
                <button onClick={detectMood} disabled={loading} className="capture-btn">
                  {loading ? '⏳ Processing...' : 'Capture Mood'}
                </button>
                <button onClick={stopVideo} className="cancel-btn" disabled={loading}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoodSelector;