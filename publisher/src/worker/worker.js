const {
    Worker, isMainThread, parentPort, workerData,
  } = require('node:worker_threads')
  

//   const worker = new Worker(__filename);
//   if (isMainThread) {
//     const worker = new Worker(__filename);
//     worker.once('message', (message) => {
//       console.log(message);  // Prints 'Hello, world!'.
//     });
//     worker.postMessage('Hello, world!');
//   } else {
//     // When a message from the parent thread is received, send it back:
//     parentPort.once('message', (message) => {
//       parentPort.postMessage(message);
//     });
//   }
  
  
  async function createWorker(data, file) {
      return new Promise((resolve, reject) => {
          try {
              const worker = new Worker(file, { workerData: data });
              const workerId = worker.threadId;
  
              worker.on('message', (msg) => {
                  console.log({ ...msg, workerId: workerId });
              });
  
              worker.on('error', reject);
  
              worker.on('exit', (code) => {
                  console.log({message: `Worker terminado con code ${code}`, workerId: workerId })
                  resolve()
              });
          } catch (error) {
              console.log(error);
              reject(error);
          }
      });
  }

  module.exports = {
    createWorker
  }