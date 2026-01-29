const crypto = require("node:crypto");
const fs = require("node:fs");

const plaintext = Buffer.from("This is my password $#*U(R&FY", "utf8");

const ciphertext = crypto.publicEncrypt({ key: publicKey }, plaintext);

console.log(ciphertext);

const decryptedData = crypto.privateDecrypt({ key: privateKey }, ciphertext);

console.log(decryptedData.toString("utf8"));
