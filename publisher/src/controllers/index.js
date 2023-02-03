const axios = require("axios");
const { callServices } = require("../services");
const { createWorker } = require("../worker/worker");
require("dotenv").config();

const publisherPosts = async (req, res, next) => {
  try {
    const response = await callServices(
      "https://jsonplaceholder.typicode.com/posts"
    );

    createWorker(
      {
        worker: response,
      },
      "../gateway/src/worker/publisherWorker.js"
    );
    res.status(200).json({ message: "Encolando Photos" });
  } catch (error) {
    console.error("ERR in publisherPhotos:", error.message);
    res.status(500).json({ message: error.message })
  }
};

const publisherUser = async (req, res, next) => {
  try {
    const response = await callServices(
      "https://jsonplaceholder.typicode.com/users"
    );
     return res.status(200).json({ message: response });
  } catch (error) {
    console.error("ERR in publisherPhotos:", error.message);
    res.status(500).json({ message: error.message })
  }
};

module.exports = { publisherPosts, publisherUser };

// https://jsonplaceholder.typicode.com/photos
// https://jsonplaceholder.typicode.com/posts
// https://jsonplaceholder.typicode.com/users
