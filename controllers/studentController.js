const Student = require('../models/Student');
const School = require('../models/School');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createStudent = async(req, res) => {
    const {schoolId} = req.body;
    const isValidSchool = await School.findById(schoolId);

    if (!isValidSchool) {
        throw new CustomError.NotFoundError(`No school with id : ${schoolId}`);
    }

    const student = await Student.create(req.body);
    res.status(StatusCodes.CREATED).json({student});
}

const getAllStudent = async(req, res) => {
    const student = await Student.find({});
    res.status(StatusCodes.OK).json({student});
}

module.exports = {createStudent, getAllStudent};