const Post = require('../models/Post');

// Create post
exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      ...req.body,
      author: req.user._id
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all posts (with filtering)
exports.getPosts = async (req, res) => {
  try {
    const match = {};
    const sort = {};

    // Filter by status
    if (req.query.status) {
      match.status = req.query.status;
    }

    // Filter by tag
    if (req.query.tag) {
      match.tags = req.query.tag;
    }

    // Filter by author
    if (req.query.author) {
      match.author = req.query.author;
    }

    // Search by title or content
    if (req.query.search) {
      match.$or = [
        { title: new RegExp(req.query.search, 'i') },
        { content: new RegExp(req.query.search, 'i') }
      ];
    }

    // Sort
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    const posts = await Post.find(match)
      .populate('author', 'name')
      .sort(sort)
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip));

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check ownership
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check ownership
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 