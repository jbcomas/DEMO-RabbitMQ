const amqp = require("amqplib");
require("dotenv").config();


const createConnectionRabbit = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await amqp.connect(`amqp://${process.env.RABBIT_HOST_AWS}:${process.env.PORT}`);
      const channel = await connection.createConfirmChannel();
      resolve({connection,channel})
    } catch (error) {
        console.error(error);
        reject(error)
    }
  });
};

module.exports = {
  createConnectionRabbit,
};
