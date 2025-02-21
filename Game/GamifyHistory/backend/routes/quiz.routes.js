// quiz.routes.js

const express = require('express');
const Quiz = require('../models/quiz'); // Assuming you have a Quiz model
const router = express.Router();

// Create a New Quiz
router.post('/create', async (req, res) => {
  const { title, description, questions, userId } = req.body;

  if (!title || !description || !questions || !userId) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Create a new quiz object
    const newQuiz = new Quiz({
      title,
      description,
      questions,
      userId, // The user who created the quiz (assuming a user ID is required)
    });

    // Save the quiz to the database
    await newQuiz.save();

    res.status(201).json({
      message: 'Quiz created successfully',
      quiz: newQuiz,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Get All Quizzes
router.get('/', async (req, res) => {
  try {
    // Fetch all quizzes
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Get a Specific Quiz by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the quiz by ID
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Update an Existing Quiz
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, questions } = req.body;

  try {
    // Find and update the quiz by ID
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { title, description, questions },
      { new: true } // This option returns the updated quiz
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({
      message: 'Quiz updated successfully',
      quiz: updatedQuiz,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Delete a Quiz
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the quiz by ID
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({
      message: 'Quiz deleted successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

module.exports = router;
