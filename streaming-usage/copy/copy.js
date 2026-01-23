const { pipeline } = require("node:stream");
const fs = require("node:fs/promises");

(async () => {
  console.time("copy");

  const srcFile = await fs.open("text-big.txt", "r");
  const destFile = await fs.open("text-copy.txt", "w");

  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();

  pipeline(readStream, writeStream, (err) => {
    console.log(err);
    console.timeEnd("copy");
  });
})();
