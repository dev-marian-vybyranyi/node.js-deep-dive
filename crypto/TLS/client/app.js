const tls = require("tls");
const fs = require("fs");


const options = {
  host: "www.facebook.com",
  port: 8000,
  ca: [fs.readFileSync("./UNCC-cert.pem")],
};

const client = tls.connect(options, () => {
  console.log("Connected to server!");

  console.log("Facebook's certificate: ");
  console.log(client.getPeerCertificate());

  console.log("Cipher suite and TLS version negotiated: ");
  console.log(client.getCipher());

  client.write("Hello from a user!");
});

client.on("data", (data) => {
  console.log("Received from server: ", data.toString("utf8"));
  client.end();
});

client.on("end", () => {
  console.log("Disconnected from server.");
});
