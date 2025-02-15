const Task = require('../models/Task');

// Create task
exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      user: req.user._id
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all tasks (with filtering)
exports.getTasks = async (req, res) => {
  try {
    const match = { user: req.user._id };

    // Filter by status
    if (req.query.status) {
      match.status = req.query.status;
    }

    // Filter by priority
    if (req.query.priority) {
      match.priority = req.query.priority;
    }

    // Filter by tag
    if (req.query.tag) {
      match.tags = req.query.tag;
    }

    // Filter by due date
    if (req.query.dueDate) {
      const date = new Date(req.query.dueDate);
      match.dueDate = {
        $gte: new Date(date.setHours(0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59))
      };
    }

    // Search in title or description
    if (req.query.search) {
      match.$or = [
        { title: new RegExp(req.query.search, 'i') },
        { description: new RegExp(req.query.search, 'i') }
      ];
    }

    const tasks = await Task.find(match)
      .sort({ dueDate: 1, priority: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update checklist item
exports.updateChecklistItem = async (req, res) => {
  try {
    const { taskId, itemId } = req.params;
    const { completed } = req.body;

    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
        user: req.user._id,
        'checklist._id': itemId
      },
      {
        $set: {
          'checklist.$.completed': completed
        }
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task or checklist item not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 