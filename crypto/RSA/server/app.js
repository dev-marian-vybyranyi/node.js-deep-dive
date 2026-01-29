const crypto = require("crypto");
const fs = require("fs");

const privateKeyPem = fs.readFileSync("./server/server-private.pem");
const publicKeyPem = fs.readFileSync("./server/server-public.pem");

const publicKey = crypto.createPublicKey({
  key: publicKeyPem,
  format: "pem",
});

const plaintext = Buffer.alloc(256);
const plaintextHex = "5468697320697320736f6d652074657874"; // This is some text
plaintext.write(
  plaintextHex,
  256 - Buffer.byteLength(plaintextHex, "hex"),
  "hex"
);

console.log(plaintext.toString("hex"));

const ciphertext = crypto.publicEncrypt(
  { key: publicKey, padding: crypto.constants.RSA_NO_PADDING },
  plaintext
);

console.log("Ciphertext: ", ciphertext.toString("hex"));