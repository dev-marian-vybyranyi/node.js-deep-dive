const http = require("http");

const PORT = 9000;

const mainServers = [
  { host: "localhost", port: 9001 },
  { host: "localhost", port: 9002 },
];
const proxy = http.createServer();

proxy.on("request", (clientRequest, proxyResponse) => {
  const mainServer = mainServers.shift();
  mainServers.push(mainServer);

  const proxyRequest = http.request({
    host: mainServer.host,
    port: mainServer.port,
    path: clientRequest.url,
    method: clientRequest.method,
    headers: clientRequest.headers,
  });

  proxyRequest.on("response", (mainServerResponse) => {
    proxyResponse.writeHead(
      mainServerResponse.statusCode,
      mainServerResponse.headers
    );

    mainServerResponse.pipe(proxyResponse);
  });
  proxyRequest.on("error", (e) => {
    console.log(e);
  });
  clientRequest.pipe(proxyRequest);
});

proxy.listen(PORT, () => {
  console.log(`Proxy server is now listening on port ${PORT}`);
});
