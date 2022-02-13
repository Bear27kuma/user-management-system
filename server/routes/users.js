const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// User List
router.get('/', userController.view);
// User Search
router.post('/', userController.find);
// User From
router.get('/adduser', userController.form);
// Create User
router.post('/adduser', userController.create);
// Edit page
router.get('/edituser/:id', userController.edit);
// Update User
router.post('/edituser/:id', userController.update);
// Delete User
router.get('/:id', userController.delete);

module.exports = router;
