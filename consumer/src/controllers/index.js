const amqp = require("amqplib");
const { createWorker } = require("../worker/worker");
require("dotenv").config();

const subscriber = async (req, res, next) => {
  try {
    createWorker(
      {
        worker: "",
      },
      "../consumer/src/worker/consumerWorker.js"
    );
    res.status(200).json({ message: "consumiendo" });
  } catch (error) {
    console.error("ERR in subscriber:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { subscriber };
