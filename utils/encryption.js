const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Load RSA keys
const privateKey = fs.readFileSync(path.join(__dirname, '../keys/private.pem'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, '../keys/public.pem'), 'utf8');

// Encrypt data using the public key
function encryptData(data) {
    return crypto.publicEncrypt(publicKey, Buffer.from(data)).toString('base64');
}

// Decrypt data using the private key
function decryptData(encryptedData) {
    return crypto.privateDecrypt(privateKey, Buffer.from(encryptedData, 'base64')).toString('utf8');
}

module.exports = { encryptData, decryptData };
