const amqp = require("amqplib");
const { clearInterval } = require("node:timers");
require("dotenv").config();

const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("node:worker_threads");
const { createConnectionRabbit } = require("../rabbitmq");

function intensity() {
  let i = 1;
  while (i--) {}
}

const consumerWorker = async () => {
  try {
    parentPort.postMessage({ message: `*** Inicio el worker-Consumer.` });
    const rabbitmq = await createConnectionRabbit();
    await rabbitmq.channel.prefetch(2);
    const queue = await rabbitmq.channel.checkQueue("wuala");
    console.log(queue);

    await rabbitmq.channel.assertExchange('my-topic','topic')
    await rabbitmq.channel.bindQueue('wuala','my-topic')

    await rabbitmq.channel.consume(
      "wuala",
      async function (msg) {
        intensity();
        parentPort.postMessage({
          id: Math.random().toFixed(3),
          message: `*** consumiendo en demo este mensaje ${msg.content}`,
        });
        await rabbitmq.channel.ack(msg);
      }
    );
   
    setInterval(async() => {
      const queue = await rabbitmq.channel.checkQueue("wuala");
      if (queue.messageCount == 0) {
        console.log(queue);
        clearInterval();
       await rabbitmq.connection.close()
        process.exit(0);
      }
    }, 3000);

    
  } catch (err) {
    parentPort.postMessage({ error: true, message: err });
  }
};

consumerWorker();

module.exports = { consumerWorker };
// console.log(`encolando en demo este mensaje ${jsonRabbit}`)
// https://jsonplaceholder.typicode.com/photos
// https://jsonplaceholder.typicode.com/posts
// https://jsonplaceholder.typicode.com/users
