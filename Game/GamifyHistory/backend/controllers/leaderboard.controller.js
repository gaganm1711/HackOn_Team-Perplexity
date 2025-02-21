// forum.controller.js

const ForumPost = require('../models/ForumPost'); // Assuming you have a ForumPost model
const Comment = require('../models/Comment'); // Assuming you have a Comment model
const User = require('../models/user'); // Assuming you have a User model

// Create a new forum post
exports.createForumPost = async (req, res) => {
  const { title, content } = req.body; // Assuming a post has a title and content

  if (!title || !content) {
    return res.status(400).json({ message: 'Please provide a title and content for the post' });
  }

  try {
    const newPost = new ForumPost({
      title,
      content,
      user: req.user._id, // Attach the user's ID to the post
    });

    // Save the post to the database
    await newPost.save();

    res.status(201).json({
      message: 'Forum post created successfully',
      post: newPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// Get all forum posts
exports.getForumPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find()
      .populate('user', 'username') // Populate user details in the post
      .sort({ createdAt: -1 }); // Sort by most recent posts

    res.status(200).json({
      message: 'Forum posts fetched successfully',
      posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// Get a single forum post by ID
exports.getForumPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await ForumPost.findById(postId)
      .populate('user', 'username')
      .populate('comments.user', 'username'); // Populate user details for comments

    if (!post) {
      return res.status(404).json({ message: 'Forum post not found' });
    }

    res.status(200).json({
      message: 'Forum post fetched successfully',
      post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// Create a comment on a post
exports.createComment = async (req, res) => {
  const { postId, content } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Please provide content for the comment' });
  }

  try {
    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = new Comment({
      content,
      user: req.user._id, // Attach the user's ID to the comment
      post: postId,
    });

    // Save the comment to the database
    await newComment.save();

    // Add the comment to the post's comment array
    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json({
      message: 'Comment created successfully',
      comment: newComment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// Upvote a post
exports.upvotePost = async (req, res) => {
  const { postId } = req.body;

  try {
    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already upvoted
    if (post.upvotes.includes(req.user._id)) {
      return res.status(400).json({ message: 'You have already upvoted this post' });
    }

    post.upvotes.push(req.user._id); // Add user ID to upvotes array
    await post.save();

    res.status(200).json({
      message: 'Post upvoted successfully',
      post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// Downvote a post
exports.downvotePost = async (req, res) => {
  const { postId } = req.body;

  try {
    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already downvoted
    if (post.downvotes.includes(req.user._id)) {
      return res.status(400).json({ message: 'You have already downvoted this post' });
    }

    post.downvotes.push(req.user._id); // Add user ID to downvotes array
    await post.save();

    res.status(200).json({
      message: 'Post downvoted successfully',
      post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

// Delete a post (Only the author or admin can delete)
exports.deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user is the author or an admin
    if (post.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'You do not have permission to delete this post' });
    }

    await post.remove();

    res.status(200).json({
      message: 'Post deleted successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};
