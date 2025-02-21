// quests.route.js

const express = require('express');
const Quest = require('../models/Quest'); // Assuming you have a Quest model
const router = express.Router();

// Create a New Quest
router.post('/create', async (req, res) => {
  const { title, description, difficulty, rewardPoints, userId } = req.body;

  if (!title || !description || !difficulty || !rewardPoints || !userId) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Create a new quest object
    const newQuest = new Quest({
      title,
      description,
      difficulty,
      rewardPoints,
      userId, // The user who created the quest (assuming a user ID is required)
    });

    // Save the quest to the database
    await newQuest.save();

    res.status(201).json({
      message: 'Quest created successfully',
      quest: newQuest,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Get All Quests
router.get('/', async (req, res) => {
  try {
    // Fetch all quests
    const quests = await Quest.find();
    res.status(200).json(quests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Get a Specific Quest by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the quest by ID
    const quest = await Quest.findById(id);
    if (!quest) {
      return res.status(404).json({ message: 'Quest not found' });
    }
    res.status(200).json(quest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Update an Existing Quest
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, difficulty, rewardPoints } = req.body;

  try {
    // Find and update the quest by ID
    const updatedQuest = await Quest.findByIdAndUpdate(
      id,
      { title, description, difficulty, rewardPoints },
      { new: true } // This option returns the updated quest
    );

    if (!updatedQuest) {
      return res.status(404).json({ message: 'Quest not found' });
    }

    res.status(200).json({
      message: 'Quest updated successfully',
      quest: updatedQuest,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Delete a Quest
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the quest by ID
    const deletedQuest = await Quest.findByIdAndDelete(id);
    if (!deletedQuest) {
      return res.status(404).json({ message: 'Quest not found' });
    }

    res.status(200).json({
      message: 'Quest deleted successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

module.exports = router;
