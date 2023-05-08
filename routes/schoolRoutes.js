const express = require('express');
const router = express.Router();

const { createSchool, getAllSchool, getAllStudents } = require('../controllers/schoolController');
const { authenticateUser, authorizePermissions, checkPermissions } = require('../middleware/authentication');

router.route('/school')
    .post(authenticateUser, checkPermissions('createAny', 'schools'), createSchool)
    .get(authenticateUser, checkPermissions('readAny', 'schools'), getAllSchool);
    
router.route('/school/students')
    .get(authenticateUser, checkPermissions('readAny', 'schools'), getAllStudents);

module.exports = router;