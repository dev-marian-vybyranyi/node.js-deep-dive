const crypto = require("node:crypto");

function hashPassword(password) {
  const salt = crypto.randomBytes(32);
  const iterations = 1_000_000;
  const keyLength = 32;
  const digest = "sha512";

  crypto.pbkdf2(
    password,
    salt,
    iterations,
    keyLength,
    digest,
    (err, derivedKey) => {
      if (err) throw err;

      console.log("PASSWORD HASHED");

      const final = derivedKey.toString("hex") + ":" + salt.toString("hex");
      console.log(final);
    }
  );
}

function verifyPassword(password, hashedPasswordPlusSalt) {
  const [derivedKeyHex, saltHex] = hashedPasswordPlusSalt.split(":");
  const storedDerivedKey = Buffer.from(derivedKeyHex, "hex");
  const salt = Buffer.from(saltHex, "hex");

  const iterations = 1_000_000;
  const keyLength = 32;
  const digest = "sha512";

  crypto.pbkdf2(
    password,
    salt,
    iterations,
    keyLength,
    digest,
    (err, derivedKey) => {
      if (err) throw err;

      if (
        storedDerivedKey.length === derivedKey.length &&
        crypto.timingSafeEqual(derivedKey, storedDerivedKey)
      ) {
        console.log("Password is correct!");
      } else {
        console.log("Password is incorrect!");
      }
    }
  );
}

const password = "secure-password";

hashPassword(password);

verifyPassword(
  password,
  "023abf016d56eb75b118d76820ca0ca71dc3ae4e32805ac0a95dcaadb225518f:1291a245b8c9d22794de1cd9af47dd6a4614ccdceac0cdf93a27b04bf791e6c5"
);
