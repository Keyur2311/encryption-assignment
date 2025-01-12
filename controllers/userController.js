const userService = require('../services/userService');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto')
const { validateUser } = require('../utils/validation');
const { decryptData, encryptData } = require('../utils/encryption')


// Load RSA keys
const serverPrivateKey = process.env.SERVER_PRIVATE
// const serverPublicKey = fs.readFileSync(path.join(__dirname, '../keys/server-public.pem'), 'utf8');
// const clientPrivateKey = fs.readFileSync(path.join(__dirname, '../keys/client-private.pem'), 'utf8');
const clientPublicKey = process.env.CLIENT_PUBLIC

async function addUser(req, res) {
    try {

        // decrypt user data with server's private key
        console.log(req.body.payload)
        console.log("heyyyyy")
        const decryptedData = decryptData(req.body.payload, serverPrivateKey)
        const data = decryptedData
        console.log("from user controller", data);


        validateUser(data); // Validate request data


        const user = await userService.addUser(data);
        // res.status(201).json(user);
    } catch (err) {
        // res.status(400).json({ error: err.message }); c
        console.log("error while adding user in userController", err)
    }
}

async function fetchUsers(req, res) {
    try {
        const filter = req.query.role ? { role: req.query.role } : {};
        const users = await userService.fetchUsers(filter);
        console.log("from user controller", users);
        const encryptedUsers = [];

        for (i = 0; i < users.length; i++) {
            const encryptedObject = encryptData(users[i], clientPublicKey);
            encryptedUsers.push(encryptedObject)
        }
        console.log("encrypted users from user controller ", encryptedUsers)
        // return encryptedUsers;
        res.status(200).json(encryptedUsers);
    } catch (err) {
        // res.status(500).json({ error: err.message });
        console.log("error while fetching all users in controller", err)
    }
}

async function deleteUser(req, res) {
    try {
        const success = await userService.deleteUser(req.params.userId);
        if (!success) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { addUser, fetchUsers, deleteUser };
