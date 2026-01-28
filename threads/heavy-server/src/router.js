const User = require("./controllers/user");
const { Worker } = require("worker_threads");
const { performance } = require("perf_hooks");

module.exports = (server) => {
  server.route("post", "/api/login", User.logUserIn);

  server.route("delete", "/api/logout", User.logUserOut);

  server.route("get", "/api/user", User.sendUserInfo);

  server.route("put", "/api/user", User.updateUser);

  server.route("get", "/api/primes", (req, res) => {
    const count = Number(req.params.get("count"));
    let startingNumber = BigInt(req.params.get("start"));
    const start = performance.now();

    if (startingNumber < BigInt(Number.MAX_SAFE_INTEGER)) {
      startingNumber = Number(startingNumber);
    }

    const worker = new Worker("./lib/calc.js", {
      workerData: { count, start: startingNumber },
    });

    const t = setTimeout(() => {
      worker.terminate();
      res.status(408).json({ message: "Request time out." });
    }, 5000);

    worker.on("message", (primes) => {
      clearTimeout(t);
      res.json({
        primes,
        time: ((performance.now() - start) / 1000).toFixed(2),
      });
    });
  });
};
