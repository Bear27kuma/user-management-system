const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

// Create, Find, Update, Delete
router.get('/', usersController.view);

module.exports = router;
