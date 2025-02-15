const Note = require('../models/Note');

// Create note
exports.createNote = async (req, res) => {
  try {
    const note = new Note({
      ...req.body,
      user: req.user._id
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all notes (with filtering)
exports.getNotes = async (req, res) => {
  try {
    const match = { user: req.user._id };

    // Filter by folder
    if (req.query.folder) {
      match.folder = req.query.folder;
    }

    // Filter by tag
    if (req.query.tag) {
      match.tags = req.query.tag;
    }

    // Search in title or content
    if (req.query.search) {
      match.$or = [
        { title: new RegExp(req.query.search, 'i') },
        { content: new RegExp(req.query.search, 'i') }
      ];
    }

    const notes = await Note.find(match)
      .sort({ updatedAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single note
exports.getNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    Object.assign(note, req.body);
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all folders
exports.getFolders = async (req, res) => {
  try {
    const folders = await Note.distinct('folder', { user: req.user._id });
    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 