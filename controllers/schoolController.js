const School = require('../models/School');
const { StatusCodes } = require('http-status-codes');

const createSchool = async(req, res) => {
    const {name, city, state, country} = req.body;
    const school = await School.create({name, city, state, country})
    res.status(StatusCodes.CREATED).json({school});
}

const getAllSchool = async(req, res) => {
    const schools = await School.find({});
    res.status(StatusCodes.OK).json({schools});
}

const getAllStudents = async(req, res) => {
    const schools = await School.find({}).populate('students');
    res.status(StatusCodes.OK).json({schools});
}

module.exports = {createSchool, getAllSchool, getAllStudents};