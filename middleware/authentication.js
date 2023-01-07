const CustomError = require('../errors')
const { isTokenValid } = require('../utils')
const Role = require('../models/Role')

// Authenticating the user and checking whether he has permission to access or not.

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;

    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }

    try {
        const { name, userId, roleId } = isTokenValid({ token });
        const roles = await Role.findById(roleId)
        req.user = { name, userId, roles };
        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
}

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!req.user.roles.scopes.includes(roles)) {
            throw new CustomError.UnauthorizedError(
                'Unauthorized to access this route'
            );
        }
        next();
    }
};

module.exports = { authenticateUser, authorizePermissions }