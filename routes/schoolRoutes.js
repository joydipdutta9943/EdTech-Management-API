const express = require("express");
const router = express.Router();

const {
  createSchool,
  getAllSchool,
  getAllStudents,
  updateSchool,
} = require("../controllers/schoolController");
const {
  authenticateUser,
  authorizePermissions,
  checkPermissions,
} = require("../middleware/authentication");

router
  .route("/school")
  .post(
    authenticateUser,
    checkPermissions("createOwn", "schools"),
    createSchool
  )
  .patch(
    authenticateUser,
    checkPermissions("updateOwn", "schools"),
    updateSchool
  )
  .get(authenticateUser, checkPermissions("readAny", "schools"), getAllSchool);

router
  .route("/school/:id")
  .patch(
    authenticateUser,
    checkPermissions("update", "schools"),
    updateSchool
  );

router
  .route("/school/students")
  .get(
    authenticateUser,
    checkPermissions("readAny", "schools"),
    getAllStudents
  );

module.exports = router;
