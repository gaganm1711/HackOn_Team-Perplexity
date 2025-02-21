// leaderboard.routes.js

const express = require('express');
const User = require('../models/user'); // Assuming you have a User model with a score field
const router = express.Router();

// Get the leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    // Fetch the top users based on score, sorted in descending order
    const leaderboard = await User.find()
      .sort({ score: -1 })  // Sorting by score in descending order
      .limit(10)  // Limit to top 10 users
      .select('username score');  // Selecting only username and score fields

    res.status(200).json({
      message: 'Leaderboard fetched successfully',
      leaderboard,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Update user's score
router.put('/update-score', async (req, res) => {
  const { userId, score } = req.body;

  if (!userId || !score) {
    return res.status(400).json({ message: 'Please provide userId and score' });
  }

  try {
    // Find the user and update their score
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { score: score } },  // Increment the score by the given value
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Score updated successfully',
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

module.exports = router;
