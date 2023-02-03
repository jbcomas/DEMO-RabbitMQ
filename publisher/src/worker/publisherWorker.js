const amqp = require("amqplib");
const { ProcessCredentials } = require("aws-sdk");
const axios = require("axios");
require("dotenv").config();
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("node:worker_threads");
const { createConnectionRabbit } = require("../rabbitmq");

function intensity() {
  let i = 5e8;
  while (i--) {}
}

const createPublisherWorker = async () => {
  try {
    const rabbitmq = await createConnectionRabbit();

    parentPort.postMessage({ message: `*** Inicio el worker` });
    await rabbitmq.channel.assertQueue("wuala", { durable: true });

    if (workerData.worker.length) {
      await workerData.worker.map(async (ele, index) => {
        const jsonRabbit = JSON.stringify({
          order: ele,
        });
        // intensity()
        rabbitmq.channel.assertExchange("my-topic", "topic");
        const send = rabbitmq.channel.publish(
          "my-topic",
          "",
          Buffer.from(jsonRabbit)
        );
        //  rabbitmq.channel.sendToQueue(
        //   "wuala",
        //   Buffer.from(jsonRabbit),
        //   {
        //     persistent: true,
        //   }
        // );
        send
          ? parentPort.postMessage({
              message: `*** encolando en wuala este mensaje ${jsonRabbit}`,
            })
          : parentPort.postMessage({
              message: `*** este mensaje => [i] ${jsonRabbit} no ha sido encolado`,
            });
      });

      const response = await axios
        .get("http://localhost:3002")
        .then((result) => result.data);

      console.log(
        "🚀 ~ file: publisherWorker.js:50 ~ createPublisherWorker ~ response",
        response
      );

      process.exit(0);
    }
  } catch (error) {
    console.error(error);
  }
};

createPublisherWorker();

module.exports = { createPublisherWorker };

// https://jsonplaceholder.typicode.com/photos
// https://jsonplaceholder.typicode.com/posts
// https://jsonplaceholder.typicode.com/users
