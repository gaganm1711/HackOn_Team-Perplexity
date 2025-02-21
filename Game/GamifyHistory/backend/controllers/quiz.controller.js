// quiz.controller.js

const Quiz = require('../models/quiz'); // Assuming you have a Quiz model
const User = require('../models/user'); // Assuming you have a User model

// Create a new quiz
exports.createQuiz = async (req, res) => {
  const { title, questions } = req.body; // Assuming a quiz has a title and an array of questions

  if (!title || !questions || questions.length === 0) {
    return res.status(400).json({ message: 'Please provide a title and at least one question' });
  }

  try {
    // Create a new quiz
    const newQuiz = new Quiz({ title, questions });

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
};

// Get all quizzes
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({
      message: 'Quizzes fetched successfully',
      quizzes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// Get a single quiz by ID
exports.getQuizById = async (req, res) => {
  const { quizId } = req.params;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({
      message: 'Quiz fetched successfully',
      quiz,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// Submit quiz answers
exports.submitQuizAnswers = async (req, res) => {
  const { quizId, answers } = req.body; // Assuming answers is an array of user responses

  if (!quizId || !answers || answers.length === 0) {
    return res.status(400).json({ message: 'Please provide quizId and answers' });
  }

  try {
    // Find the quiz by ID
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Check if the answers are correct and calculate score
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score += 1;
      }
    });

    // Find the user who submitted the quiz
    const user = req.user; // Assuming the user info is attached to req.user by middleware
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Update the user's score (if applicable)
    user.score += score;
    await user.save();

    res.status(200).json({
      message: 'Quiz submitted successfully',
      score,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// Get a user's quiz results
exports.getUserQuizResults = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId).populate('quizzesTaken');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User quiz results fetched successfully',
      results: user.quizzesTaken, // Assuming user has a 'quizzesTaken' field to track their results
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};
