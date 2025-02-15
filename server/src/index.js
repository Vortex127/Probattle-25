const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());  // Allows frontend to communicate with backend
app.use(express.json());  // Parses JSON request body

// Connect to MongoDB with more detailed error logging
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.error(err);
  });

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Beacon API' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/tasks', require('./routes/tasks'));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 