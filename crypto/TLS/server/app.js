const tls = require("tls");
const fs = require("fs");

const server = tls.createServer({
  key: fs.readFileSync("./server/facebook-private.pem"),
  cert: fs.readFileSync("./facebook-cert.pem"),
});

server.on("connection", () => {
  console.log(
    "TCP handshake successfully completed, traffic is NOT encrypted yet."
  );
});

server.on("secureConnection", (socket) => {
  console.log(
    "TLS handshake successfully completed, secure connection established."
  );

  socket.on("data", (data) => {
    console.log("Received from client: ", data.toString("utf8"));
    socket.write("Hello from facebook!");
  });

  socket.on("end", () => {
    console.log("Client disconnected.");
  });
});

server.on("tlsClientError", (err, socket) => {
  console.error("TLS Error:");
  console.error(err);
});

const PORT = 8000;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Facebook server running on port ${PORT}`);

  console.log(server.address());
});
