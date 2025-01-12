const path = require('path');
const fs = require('fs');
const User = require('../models/userModel')
const { encryptData, decryptData } = require('../utils/encryption');



// Load RSA keys
const serverPrivateKey = process.env.SERVER_PRIVATE
const serverPublicKey = process.env.SERVER_PUBLIC
// const clientPrivateKey = fs.readFileSync(path.join(__dirname, '../keys/client-private.pem'), 'utf8');
// const clientPublicKey = fs.readFileSync(path.join(__dirname, '../keys/client-public.pem'), 'utf8');

const addUser = async (userData) => {
    // Encrypt sensitive fields

    console.log("from userservice", userData,)

    const encryptedData = encryptData(userData, serverPublicKey);

    console.log(encryptedData.name.length)
    console.log(encryptedData.email.length)
    console.log(encryptedData.role.length)
    return await User.create(encryptedData);
}

const fetchUsers = async (filter = {}) => {
    const users = await User.findAll({ where: filter });
    // Decrypt sensitive fields before returning

    console.log("from user service", users)

    console.log(users.length)

    // try {
    //     for (i = 0; i < 1; i++) {
    //         console.log(users[0].dataValues.name)
    //     }
    // } catch (err) {
    //     console.log(err)
    // }

    // const users = await User.findAll({ where: filter });
    const finalusers = [];
    for (i = 0; i < users.length; i++) {
        const id = users[i].dataValues.id;
        const newData = {
            name: users[i].dataValues.name,
            email: users[i].dataValues.email,
            role: users[i].dataValues.role,
        }
        console.log(newData)
        const final = decryptData(newData, serverPrivateKey);
        finalusers.push(final);
        console.log("final users", finalusers)
    }



    console.log("Decrypted Users:", finalusers);
    return finalusers; // Return or use as necessary




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