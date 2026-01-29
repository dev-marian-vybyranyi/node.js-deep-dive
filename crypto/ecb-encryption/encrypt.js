const crypto = require("node:crypto");

const key = Buffer.from("0123456789abcdef", "utf-8");

const plaintext = Buffer.from("330f0f0f0f0f0f0f0f0f0f0f0f0f0f0f231", "hex");

const cipher = crypto.createCipheriv("aes-128-ecb", key, null);
cipher.setAutoPadding(true);

const cipherChunk1 = cipher.update(plaintext);
const cipherChunk2 = cipher.final();

const ciphertext = Buffer.concat([cipherChunk1, cipherChunk2]);

console.log("Ciphertext: ", ciphertext);
console.log("Plaintext size: ", plaintext.length);
console.log("Ciphertext size: ", ciphertext.length);
console.log(ciphertext.toString("hex"));
