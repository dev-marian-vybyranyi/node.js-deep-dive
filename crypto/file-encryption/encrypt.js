const fs = require("node:fs");
const crypto = require("node:crypto");
const { pipeline } = require("node:stream");

const password = process.env.FE_PASSWORD || "nonSecurePassword";

const algorithm = "aes-256-gcm";

const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);

console.log("Salt:", salt.toString("hex"));
console.log("IV:", iv.toString("hex"));

crypto.pbkdf2(password, salt, 1_000_000, 32, "sha512", (err, key) => {
  if (err) return console.error(err);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const plaintext = fs.createReadStream("./data.txt");
  const output = fs.createWriteStream("./data.enc");

  output.write(salt);
  output.write(iv);

  pipeline(plaintext, cipher, output, (err) => {
    if (err) return console.error(err);

    const authCode = cipher.getAuthTag();
    console.log("MAC:", authCode.toString("hex"));
    fs.appendFileSync("./data.enc", authCode);
    console.log("Encryption completed and authentication tag written.");
  });
});
