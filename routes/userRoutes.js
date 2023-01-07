const express = require('express')
const router = express.Router()
const { register, login, getAllUsers, getSingleUser } = require('../controllers/userController');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

router.route('/').get(authenticateUser, authorizePermissions('user-get'), getAllUsers);
router.route('/signup').post(register);
router.route('/signin').post(login);
router.route('/:id').get(authenticateUser, authorizePermissions('user-get'), getSingleUser);

module.exports = router;