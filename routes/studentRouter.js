const express = require('express');
const router = express.Router();

const { createStudent, getAllStudent } = require('../controllers/studentController');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

router.route('/student')
    .post(authenticateUser, authorizePermissions('student-create'), createStudent)
    .get(authenticateUser, authorizePermissions('student-get'), getAllStudent);

module.exports = router;