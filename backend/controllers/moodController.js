const { getTaskRecommendations } = require('../services/aiService');

const getRecommendations = async (req, res) => {
  const { mood, context } = req.body; // Get context from request

  if (!mood) {
    return res.status(400).json({ message: 'Mood is required' });
  }

  try {
    // Pass both mood and context to the service
    const tasks = await getTaskRecommendations(mood, context);
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRecommendations };