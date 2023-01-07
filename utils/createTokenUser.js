const createTokenUser = (user) => {
    return { name: user.first_name + " " + user.last_name, userId: user._id, roleId: user.roleId }
}
module.exports = createTokenUser