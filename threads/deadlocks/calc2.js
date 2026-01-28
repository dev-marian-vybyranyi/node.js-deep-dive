const { workerData, threadId } = require("worker_threads");

const number = new Uint32Array(workerData.number);
const A = new Int32Array(workerData.A);
const B = new Int32Array(workerData.B);

function lock(seal) {
  while (Atomics.compareExchange(seal, 0, 0, 1) === 1) {
    Atomics.wait(seal, 0, 1);
  }
}

function unlock(seal) {
  Atomics.store(seal, 0, 0);
  Atomics.notify(seal, 0, 1);
}

lock(B);

lock(A);

console.log(`${threadId} doing work with both B & A...`);

unlock(B);

unlock(A);
