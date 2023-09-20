// Node.js program to demonstrate the flow of crypto.publicEncrypt() method

// Importing crypto and fs module
const crypto = require('crypto');
const fs = require("fs");

// Creating below function for generating keys
function generateKeyFiles() {

   const keyPair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 520,
      publicKeyEncoding: {
         type: 'spki',
         format: 'pem'
      },
      privateKeyEncoding: {
         type: 'pkcs8',
         format: 'pem',
         cipher: 'aes-256-cbc',
         passphrase: ''
      }
   });

   // Creating the public key file
   fs.writeFileSync("public_key", keyPair.publicKey);
}

// Generating keys
//generateKeyFiles();

// Encrypting string using the below function
function encryptString (plaintext, publicKeyFile) {
   const publicKey = fs.readFileSync(publicKeyFile, "utf8");

   //Calling publicEncrypt() with below parameters
   const encrypted = crypto.publicEncrypt(
      publicKey, Buffer.from(plaintext));
   return encrypted;
}



// Text that will be encrypted
const plainText = "Hello TutorialsPoint!";

// Defining the encrypted text
var encrypted = encryptString(plainText, "public_key").toString('base64');
console.log("Buffer: ", encrypted);
 encrypted = encryptString(plainText, "public_key").toString('base64');
 console.log("Buffer: ", encrypted);

// Printing plain text
//console.log("Plaintext:", plainText);
