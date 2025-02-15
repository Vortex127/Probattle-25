const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'public'
  },
  tags: [{
    type: String,
    trim: true
  }],
  coverImage: {
    type: String
  },
  readingTime: {
    type: String
  }
}, {
  timestamps: true
});

// Generate excerpt from content
postSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    // Remove HTML tags and get first 150 characters
    this.excerpt = this.content
      .replace(/<[^>]*>/g, '')
      .slice(0, 150)
      .trim() + '...';
  }
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post; 