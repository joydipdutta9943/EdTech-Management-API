const express = require('express');
const router = express.Router();

const { createSchool, getAllSchool, getAllStudents } = require('../controllers/schoolController');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

router.route('/school')
    .post(authenticateUser, authorizePermissions('school-create'), createSchool)
    .get(authenticateUser, authorizePermissions('school-get'), getAllSchool);
    
router.route('/school/students')
    .get(authenticateUser, authorizePermissions('school-students'), getAllStudents);

module.exports = router;