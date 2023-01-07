const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

const register = async (req, res) => {
    const { email } = req.body;
    const emailAlreadyExists = await User.findOne({ email })
    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists');
    }
    const user = await User.create({ ...req.body })

    // Creating a token and attaching a cookie for later authentication.
    // No need to attach JWT in PostMan manually, Just SignIn or SignUp and do all work. 

    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser })
    res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser })
    res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

const getAllUsers = async (req, res) => {
    const user = await User.find({}).select('-Password');
    res.status(StatusCodes.OK).json({ user });
};

const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select('-Password');
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
    } else {
        res.status(StatusCodes.OK).json({ user });
    }
};

module.exports = {
    register,
    login,
    getAllUsers,
    getSingleUser
}