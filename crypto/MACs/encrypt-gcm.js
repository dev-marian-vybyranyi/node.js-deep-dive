const crypto = require("node:crypto");
const fs = require("node:fs");
const { pipeline } = require("node:stream");

const key = Buffer.from("0123456789abcdef", "utf-8");

const iv = Buffer.from("0123456789abcdef", "utf-8");

const cipher = crypto.createCipheriv("aes-128-gcm", key, iv);

const plaintext = fs.createReadStream("./plaintext.txt");
const ciphertext = fs.createWriteStream("./ciphertext.enc");

pipeline(plaintext, cipher, ciphertext, (err) => {
  if (err) return console.error("Pipeline failed: ", err);
  console.log("Encryption completed.");

  console.log(cipher.getAuthTag());
  console.log(cipher.getAuthTag().toString("hex"));
});
