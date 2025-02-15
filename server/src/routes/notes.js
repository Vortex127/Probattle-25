const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

router.post('/', noteController.createNote);
router.get('/', noteController.getNotes);
router.get('/folders', noteController.getFolders);
router.get('/:id', noteController.getNote);
router.patch('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router; 