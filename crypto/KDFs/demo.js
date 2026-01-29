const crypto = require("crypto");

const password = "my_password";
const salt = crypto.randomBytes(32);
const keyLength = 64;

console.log("Password:", password);
console.log("Salt:", salt.toString("hex"));
console.log("Key Length:", keyLength);

function demoPBKDF2() {
  const iterations = 1_000_000;
  const digest = "sha512";

  crypto.pbkdf2(
    password,
    salt,
    iterations,
    keyLength,
    digest,
    (err, derivedKey) => {
      if (err) throw err;
      console.log("\n=== PBKDF2 Demo ===");
      console.log("Iterations:", iterations);
      console.log("Digest Algorithm:", digest);
      console.log("Derived Key:", derivedKey.toString("hex"));
    }
  );
}

function demoScrypt() {
  const options = {
    cost: 16384,
    blockSize: 8,
    parallelization: 1,
  };

  crypto.scrypt(password, salt, keyLength, options, (err, derivedKey) => {
    if (err) throw err;
    console.log("\n=== Scrypt Demo ===");
    console.log("Options:", options);
    console.log("Derived Key:", derivedKey.toString("hex"));
  });
}

function demoHKDF() {
  const info = Buffer.from("Some more data here...");
  const digest = "sha512";

  crypto.hkdf(digest, password, salt, info, keyLength, (err, derivedKey) => {
    if (err) throw err;
    console.log("\n=== HKDF Demo ===");
    console.log("Info:", info.toString());
    console.log("Digest Algorithm:", digest);
    console.log("Derived Key:", Buffer.from(derivedKey).toString("hex"));
  });
}

demoPBKDF2();
demoScrypt();
demoHKDF();
