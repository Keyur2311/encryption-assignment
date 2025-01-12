const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Load RSA keys
const serverPrivateKey = fs.readFileSync(path.join(__dirname, '../keys/server-private.pem'), 'utf8');
const serverPublicKey = fs.readFileSync(path.join(__dirname, '../keys/server-public.pem'), 'utf8');
const clientPrivateKey = fs.readFileSync(path.join(__dirname, '../keys/client-private.pem'), 'utf8');
const clientPublicKey = fs.readFileSync(path.join(__dirname, '../keys/client-public.pem'), 'utf8');
// // Encrypt data using the public key
// function encryptData(data, key) {
//     return crypto.publicEncrypt(key, Buffer.from(data)).toString('base64');
// }

// // Decrypt data using the private key
// function decryptData(encryptedData, key) {
//     return crypto.privateDecrypt(key, Buffer.from(encryptedData, 'base64')).toString('utf8');
// }

// Encrypt data using the public key
function encryptData(data, key) {
    if (typeof data === 'object' && data !== null) {
        const encryptedObject = {};
        for (const [field, value] of Object.entries(data)) {
            encryptedObject[field] = crypto.publicEncrypt(key, Buffer.from(value)).toString('base64');
        }
        return encryptedObject;
    }
    throw new Error('Input data must be an object.');
}

// Decrypt data using the private key
function decryptData(encryptedData, key) {
    if (typeof encryptedData === 'string') {
        // Single encrypted string
        return crypto.privateDecrypt(key, Buffer.from(encryptedData, 'base64')).toString('utf8');
    } else if (typeof encryptedData === 'object' && encryptedData !== null) {
        // Object of encrypted fields
        const decryptedObject = {};
        for (const [field, encryptedValue] of Object.entries(encryptedData)) {
            decryptedObject[field] = crypto.privateDecrypt(key, Buffer.from(encryptedValue, 'base64')).toString('utf8');
        }
        console.log(decryptedObject)
        return decryptedObject;
    }
    throw new Error('Input data must be a string or an object.');
}


module.exports = { encryptData, decryptData };
