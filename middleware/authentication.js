const CustomError = require("../errors");
const { isTokenValid } = require("../utils");
const Role = require("../models/Role");
const AccessControl = require("accesscontrol");

// Authenticating the user and checking whether he has permission to access or not.

const ac = new AccessControl();
ac.grant("Manager").readAny("schools");

ac.grant("Administrator")
  .extend("Manager")
  .createAny("schools")
  .updateAny("schools")
  .deleteAny("schools");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { name, userId, roleId } = isTokenValid({ token });
    const role = await Role.findById(roleId);
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (...scopes) => {
  return (req, res, next) => {
    if (!req.user.role.scopes.includes(scopes)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

function checkPermissions(action, resource) {
  return (req, res, next) => {
    const permission = ac.can(req.user.role.name)[action](resource);
    if (permission.granted) {
      next();
    } else {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
  };
}

module.exports = { authenticateUser, authorizePermissions, checkPermissions };
