const crypto = require("crypto");

// AES
const cipher = "aes-128-ecb";

const key = Buffer.from("4e2ba6d34baff532ee26bbbb16d34baf", "hex");

function encrypt(plaintext) {
  const encryptor = crypto.createCipheriv(cipher, key, null);
  const ciphertext = Buffer.concat([
    encryptor.update(plaintext),
    encryptor.final(),
  ]);
  return ciphertext;
}

function decrypt(ciphertext) {
  const decryptor = crypto.createDecipheriv(cipher, key, null);
  const plaintext = Buffer.concat([
    decryptor.update(ciphertext),
    decryptor.final(),
  ]);
  return plaintext;
}

const plaintext = Buffer.from("My password is hHF2346%62nvFW.");

const ciphertext = encrypt(plaintext);

const decryptedPlaintext = decrypt(ciphertext);

console.log("Plaintext:", plaintext.toString("utf8"));
console.log("Ciphertext:", ciphertext.toString("utf8"));
console.log("Decrypted Plaintext:", decryptedPlaintext.toString("utf8"));
