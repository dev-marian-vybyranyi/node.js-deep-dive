const fs = require("fs");

const key = fs.readFileSync("./key");

console.log("Key:");
console.log(key.toString("hex"));

let keyOffset = 0;

function encrypt(plaintext) {
  if (keyOffset + plaintext.length > key.length) {
    return console.error("Key length not enough to encrypt this message.");
  }

  const ciphertext = Buffer.alloc(plaintext.length);

  for (let i = 0; i < plaintext.length; i++) {
    ciphertext[i] = plaintext[i] ^ key[keyOffset + i];
    key[keyOffset + i] = 0;
  }

  keyOffset = keyOffset + plaintext.length;

  return ciphertext;
}

const msg1 = Buffer.from("Commander Hendrick: Stand by to launch.");
const msg2 = Buffer.from(
  "Commander Hendrick: Terminate operation immediately."
);

const msg1Encrypted = encrypt(msg1);
const msg2Encrypted = encrypt(msg2);

console.log("\nEncrypted Message 1:");
console.log(msg1Encrypted.toString("hex"));
console.log("\nEncrypted Message 2:");
console.log(msg2Encrypted.toString("hex"));
