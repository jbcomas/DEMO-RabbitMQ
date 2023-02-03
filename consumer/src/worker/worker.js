const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("node:worker_threads");

async function createWorker(data, file) {
  return new Promise((resolve, reject) => {
    try {
      const worker = new Worker(file, { workerData: data });
      const workerId = worker.threadId;

      worker.on("message", (msg) => {
        console.log({ ...msg, workerId: workerId });
      });

      worker.on("error", reject);

      worker.on("exit", (code) => {
        console.log({
          message: `Worker terminado con code ${code}`,
          workerId: workerId,
        });
        resolve(worker);
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

module.exports = {
  createWorker,
};
