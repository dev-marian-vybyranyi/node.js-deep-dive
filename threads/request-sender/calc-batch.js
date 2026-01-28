const { workerData, parentPort } = require("worker_threads");
const sendRequest = require("./sendRequest");

async function sendBatchRequests(count) {
  const requestPromises = [];

  for (let i = 0; i < count; i++) {
    requestPromises.push(
      sendRequest(
        workerData.hostname,
        workerData.port,
        workerData.path,
        workerData.method
      )
    );
  }

  try {
    await Promise.all(requestPromises);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

(async () => {
  let requestsRemaining = workerData.count;
  const batchSize = 150;
  const batches = Math.ceil(workerData.count / batchSize);

  for (let i = 0; i < batches; i++) {
    const reqToSendBatch = Math.min(
      batchSize,
      workerData.count,
      requestsRemaining
    );

    await sendBatchRequests(reqToSendBatch);

    requestsRemaining -= reqToSendBatch;
  }
})();
