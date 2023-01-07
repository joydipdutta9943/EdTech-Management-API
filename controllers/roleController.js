const Role = require('../models/Role');
const { StatusCodes } = require('http-status-codes');

const createRole = async(req, res) => {
    const {name, scopes} = req.body;
    const role = await Role.create({name, scopes})
    res.status(StatusCodes.CREATED).json({role});
}

const getAllRole = async(req, res) => {
    const roles = await Role.find({});
    res.status(StatusCodes.OK).json({roles});
}

module.exports = {createRole, getAllRole};