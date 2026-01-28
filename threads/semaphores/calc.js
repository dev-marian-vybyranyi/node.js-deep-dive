const { workerData } = require("worker_threads");

const number = new Uint32Array(workerData.number);
const seal = new Int32Array(workerData.seal);

function lock(seal) {
  while (Atomics.compareExchange(seal, 0, 0, 1) === 1) {
    Atomics.wait(seal, 0, 1);
  }
}

function unlock(seal) {
  Atomics.store(seal, 0, 0);
  Atomics.notify(seal, 0, 1);
}

for (let i = 0; i < 10_000_000; i++) {
  lock(seal);

  number[0] = number[0] + 1;

  unlock(seal);
}
