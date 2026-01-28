const { Worker } = require("worker_threads");

new Worker("./calc.js");

while (true) {}