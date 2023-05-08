const School = require("../models/School");
const { StatusCodes } = require("http-status-codes");
var _ = require("lodash");

const createSchool = async (req, res) => {
  const { name, city, state, country } = req.body;
  const school = await School.create({ name, city, state, country });
  res.status(StatusCodes.CREATED).json({ school });
};

const updateSchool = async (req, res) => {
  const schoolId = req.params.id;
  const { name, city, state, country, attributes } = req.body;

  const document = {
    name,
    city,
    state,
    country
  }

  const granted_document = _.pick(document, attributes);

  const school = await School.findOneAndUpdate({ _id: schoolId }, granted_document, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.CREATED).json({ school });
};

const getAllSchool = async (req, res) => {
  const schools = await School.find({});
  res.status(StatusCodes.OK).json({ schools });
};

const getAllStudents = async (req, res) => {
  const schools = await School.find({}).populate("students");
  res.status(StatusCodes.OK).json({ schools });
};

module.exports = { createSchool, getAllSchool, getAllStudents, updateSchool };
