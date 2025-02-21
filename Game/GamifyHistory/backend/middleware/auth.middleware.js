// auth.middleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming you have a User model

// JWT Secret Key (ensure it's the same key as in the auth.routes.js)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to protect routes that require authentication
const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authentication required. Token missing.' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.userId); // Attach the user to the request object

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user?.isAdmin) {
    return next(); // If user is admin, proceed to the next middleware/route
  } else {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

module.exports = { authenticateUser, isAdmin };
