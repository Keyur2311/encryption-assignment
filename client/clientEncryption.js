const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Load RSA keys
// const serverPrivateKey = fs.readFileSync(path.join(__dirname, '../keys/server-private.pem'), 'utf8');
const serverPublicKey = process.env.SERVER_PUBLIC
const clientPrivateKey = process.env.CLIENT_PRIVATE
// const clientPublicKey = fs.readFileSync(path.join(__dirname, '../keys/client-public.pem'), 'utf8');
const { encryptData, decryptData } = require('../utils/encryption');

const userData = {
    name: "ayusshhh",
    email: "ayushhhh@gmail.com",
    role: "Viewer"
};

// Encrypt and send the payload to the server
const addUser = async (userData) => {
    const encryptedData = encryptData(userData, serverPublicKey)
    console.log(encryptedData)

    try {
        const response = await axios.post('http://localhost:5000/api/users', {
            payload: encryptedData,
        });
        console.log('Add User Response:', response.data);
    } catch (error) {
        console.error('Error adding user:', error.message);
    }
};

// Fetch all users from the server
const fetchAllUsers = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/users');
        const encryptedUsers = response.data;
        console.log("encrypted users from client encryption", encryptedUsers);
        // Decrypt each user's data (if needed for client-side)

        const finalUsers = [];

        for (i = 0; i < encryptedUsers.length; i++) {
            const decObj = decryptData(encryptedUsers[i], clientPrivateKey);
            finalUsers.push(decObj);
        }
        console.log('Fetched Users:', finalUsers);
    } catch (error) {
        console.error('Error fetching users:', error.message);
    }
};

// Delete a user by ID
const deleteUser = async (userId) => {
    // const encryptedData = encryptData({ id: userId });

    try {
        const response = await axios.delete(`http://localhost:5000/api/users/${userId}`, {
            // data: { payload: encryptedData },
        });
        console.log('Delete User Response:', response.data);
    } catch (error) {
        console.error('Error deleting user:', error.message);
    }
};

// Example usage
addUser(userData); // Add a new user
// fetchAllUsers(); // Fetch all users
// deleteUser(12); // Delete a user with ID 10

// const decryptedData = {
//     name: 'Jqi5nqJX9X5Ipxaykuk7bs5CwhYF6x7bPfL1ZjJMEWSl5d7p/5y/ziOyuxBT0drUT/lu1PqYM+Nsdob958OiGzZqhnst85v6sY5yXUYk9/QkD6QZRPj/rsLTgVtcQCEDeCon/up5HG03dHC4ZgKW9xiXcCGzvyoJyw/1dvWUfrwRpOVZ9WZpXlT91Mvpj5zYnOej5xlplzfzChx36goPDgu7hgqHqzPNUbbtTPgc2/eHZbBkj+b7EwPu2UN4GcXkc6R5IRCM21qI7dbIdglTqwj1tlpIRn4y0veVXPabiB66/l1rwQ1k4zAO+Mz5Cb0SvOZ7ZAdVC/lJBORlwNUx9A==',
//     email: 'udk+YXtyEXIe+23tHKqKfFP6yBpGOykAB6zj7s8JUdlX8DfA8G6RBpCXmpKTwT46GypM1uW8PNoI2ASz+VJDpFG7uGP1bykOOlqjp9uY3HgZn/WlqFb0798Fu/BSIsgX+j43QXZWbQAMPHG5eX7ZZlRPTjnoGz3x31vB7KoQSE8luio8dg6pK2HX54uzZjjAM0jwfUtbg+kIrd8RDkyVe+oPHhNSXv8kQeryFmvm0lWpRpeAR2s4HIYV9bzyr2KJ+Uo4QaqrAM2jWmu1ALsg53igWN7beRSW9XyqqcMRcttbRKK6bSN0WjWJ157CP0y1N1SLLcgTPoU0oX8X7R1OFg==',
//     role: 'duWaOpoP9GyzfG2YnV4SZhHNPhWKOed6GZWJHRIFkyrO2u5nsi+D9FYuUzbBlJwrLz6KWG+OqEESPBXGH7LrDSZiPY0cmdxGPwAy7ii4ELdYoUX2o6KtbKJ8f3sw5mXz4xVMF9eHgtT3pwkbcEhhv10vtj5nLGzSQ/niFAGGLCkQGsX4e/PGZLDTL7fCrTYeR5Cd8PGUB12SFyRLL/vW28OgAw4fMGgZYuFtawO21uIvMdzofmcr8KC5DM0D9SWjNJGw/ggd0UeUpyCtZrrSqXyYhe9wgXexBCFdKlKbxqtIn5bT1AkI79Sp42KZEHgsC9NbCeW8BrJ0vmpE+CGE2w=='
// }
// const data = decryptData(decryptedData, serverPrivateKey);
// console.log(data);