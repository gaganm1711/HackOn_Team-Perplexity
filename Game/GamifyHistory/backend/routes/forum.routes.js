// forum.routes.js

const express = require('express');
const ForumThread = require('../models/ForumThread'); // Assuming you have a ForumThread model
const ForumComment = require('../models/ForumComment'); // Assuming you have a ForumComment model
const router = express.Router();

// Create a New Forum Thread
router.post('/create-thread', async (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Create a new forum thread
    const newThread = new ForumThread({
      title,
      content,
      userId, // The user who created the thread
    });

    // Save the thread to the database
    await newThread.save();

    res.status(201).json({
      message: 'Thread created successfully',
      thread: newThread,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Get All Forum Threads
router.get('/threads', async (req, res) => {
  try {
    // Fetch all forum threads
    const threads = await ForumThread.find().populate('userId', 'username'); // Populate user details
    res.status(200).json(threads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Get a Specific Forum Thread by ID
router.get('/thread/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the thread by ID
    const thread = await ForumThread.findById(id).populate('userId', 'username');
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    // Fetch the comments for the thread
    const comments = await ForumComment.find({ threadId: id }).populate('userId', 'username');
    
    res.status(200).json({ thread, comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Post a Comment on a Forum Thread
router.post('/comment', async (req, res) => {
  const { threadId, content, userId } = req.body;

  if (!threadId || !content || !userId) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Create a new forum comment
    const newComment = new ForumComment({
      threadId,
      content,
      userId, // The user who posted the comment
    });

    // Save the comment to the database
    await newComment.save();

    res.status(201).json({
      message: 'Comment posted successfully',
      comment: newComment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Update a Forum Thread
router.put('/thread/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    // Find and update the forum thread
    const updatedThread = await ForumThread.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedThread) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    res.status(200).json({
      message: 'Thread updated successfully',
      thread: updatedThread,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Delete a Forum Thread
router.delete('/thread/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the forum thread
    const deletedThread = await ForumThread.findByIdAndDelete(id);
    if (!deletedThread) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    // Also delete all comments associated with the thread
    await ForumComment.deleteMany({ threadId: id });

    res.status(200).json({
      message: 'Thread and associated comments deleted successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Delete a Forum Comment
router.delete('/comment/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the forum comment
    const deletedComment = await ForumComment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({
      message: 'Comment deleted successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

module.exports = router;
