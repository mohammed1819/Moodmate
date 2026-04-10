const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getTaskRecommendations = async (mood, context) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' }); 
    const prompt = `
      The user is feeling "${mood}".
      User's Profession/Context: "${context || 'General User'}".
      
      Based on this mood and their profession, recommend 3 short, actionable, and empathetic tasks.
      If they are a student, suggest study-related breaks. If they are a professional, suggest work-life balance tasks.
      
      Format the response strictly as a JSON array of strings.
      Example: ["Take a 5-minute deep breath break", "Write down one thing you are grateful for", "Drink a glass of water"]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up response to ensure it's valid JSON
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to get recommendations from AI');
  }
};

module.exports = { getTaskRecommendations };