const { Worker, MessageChannel } = require("worker_threads");

/*
const obj = { name: "Marian" };

new Worker("./calc.js", { workerData: obj });

console.log("Object from main thread:", obj);
*/

/*
const channel = new MessageChannel();

const port1 = channel.port1;
const port2 = channel.port2;

port1.postMessage({ name: "Marian" });
port2.postMessage({ name: "Marian" });


port1.on("message", (msg) => {
  console.log(`Message received on port1: `, msg);
});

port2.on("message", (msg) => {
  console.log(`Message received on port2: `, msg);
});
*/

/* 
const { port1, port2 } = new MessageChannel();

const thread1 = new Worker("./calc.js", {
  workerData: { port: port1 },
  transferList: [port1],
});

const thread2 = new Worker("./calc.js", {
  workerData: { port: port2 },
  transferList: [port2],
});
*/

/* 
const channel1 = new MessageChannel();
const channel2 = new MessageChannel();

const thread1 = new Worker("./calc.js", {
  workerData: { port: channel1.port2 },
  transferList: [channel1.port2],
});

const thread2 = new Worker("./calc.js", {
  workerData: { port: channel2.port2 },
  transferList: [channel2.port2],
});

channel1.port1.on("message", (msg) => {
  console.log("Main thread got this on channel 1: ", msg);
});

channel2.port1.on("message", (msg) => {
  console.log("Main thread got this on channel 2: ", msg);
});

channel1.port1.postMessage("Some text from main thread");
channel2.port1.postMessage("Some text from main thread");
*/

const thread1 = new Worker("./calc.js");

thread1.on("message", (msg) => {
  console.log("Main thread got this: ", msg);
});

thread1.postMessage({ name: "Marian" });
