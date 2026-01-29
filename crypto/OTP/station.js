const fs = require("fs");

const key = fs.readFileSync("./key");

let keyOffset = 0;

function decrypt(ciphertext) {
  if (keyOffset + ciphertext.length > key.length) {
    return console.error("Key length not enough to decrypt this message.");
  }

  const plaintext = Buffer.alloc(ciphertext.length);

  for (let i = 0; i < plaintext.length; i++) {
    plaintext[i] = ciphertext[i] ^ key[keyOffset + i];
    key[keyOffset + i] = 0;
  }

  keyOffset += ciphertext.length;

  return plaintext;
}

const ciphertext1 = Buffer.from("<grab-ciphertext-from-terminal>", "hex");
const ciphertext2 = Buffer.from("<grab-ciphertext-from-terminal>", "hex");

const plaintext1 = decrypt(ciphertext1);
const plaintext2 = decrypt(ciphertext2);
console.log(plaintext1.toString("utf8"));
console.log(plaintext2.toString("utf8"));
