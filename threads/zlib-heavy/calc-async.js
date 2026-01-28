const { workerData, parentPort } = require("worker_threads");
const zlib = require("zlib");
const fs = require("fs");

function compress(data) {
  return new Promise((resolve, reject) => {
    zlib.deflate(data, (err, buffer) => {
      if (err) {
        console.error("An error occurred:", err);
        reject(err);
      }
      resolve("done");
    });
  });
}

(async () => {
  const data = fs.readFileSync("./text.txt");
  const totalIterations = workerData.count;
  const batchSize = 1_000;

  let remainingIterations = totalIterations;

  while (remainingIterations > 0) {
    const iterationsToProcess = Math.min(batchSize, remainingIterations);
    let promises = [];

    for (let i = 0; i < iterationsToProcess; i++) {
      promises.push(
        compress(data)
          .then((result) => {})
          .catch((err) => {
            console.error("Error compressing:", err);
          })
      );
    }

    await Promise.all(promises);

    remainingIterations -= iterationsToProcess;
  }

  parentPort.postMessage("done");
})();
