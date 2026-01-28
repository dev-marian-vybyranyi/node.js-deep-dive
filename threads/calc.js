const { Worker } = require("worker_threads");
const fs = require("fs");

setTimeout(() => {
  fs.writeFile("./text.txt", "This is some text for testing...", (err) => {
    if (err) return console.log(err);
    console.log("File created successfully!");
  });
}, 3000);