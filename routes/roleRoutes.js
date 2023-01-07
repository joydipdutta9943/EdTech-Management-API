const express = require('express');
const router = express.Router();

const { createRole, getAllRole } = require('../controllers/roleController');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

router.route('/role')
    .post(createRole)
    .get(authenticateUser, authorizePermissions('role-get'), getAllRole);

module.exports = router;