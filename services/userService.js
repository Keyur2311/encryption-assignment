const User = require('../models/userModel')
const { encryptData, decryptData } = require('../utils/encryption');

const addUser = async (userData) => {
    // Encrypt sensitive fields

    console.log(userData.name)
    const encryptedData = {
        name: encryptData(userData.name),
        email: encryptData(userData.email),
        role: userData.role, // Role need not be encrypted
    };

    console.log(encryptedData.name.length)
    return await User.create(encryptedData);
}

const fetchUsers = async (filter = {}) => {
    const users = await User.findAll({ where: filter });
    // Decrypt sensitive fields before returning
    return users.map(user => ({
        id: user.id,
        name: decryptData(user.name),
        email: decryptData(user.email),
        role: user.role,
    }));
    // const allusers = await User.findAll();
    // console.log(allusers)
    // console.log("abccc")
    // return User.findAll({ where: filter })
}

const deleteUser = async (userId) => {
    const user = await User.findByPk(userId)
    if (user) {
        await user.destroy();
        return true
    }

    return false;
}

module.exports = { addUser, fetchUsers, deleteUser }