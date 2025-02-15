const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  folder: {
    type: String,
    default: 'General'
  },
  tags: [{
    type: String,
    trim: true
  }],
  color: {
    type: String,
    default: '#ffffff'
  }
}, {
  timestamps: true
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note; 