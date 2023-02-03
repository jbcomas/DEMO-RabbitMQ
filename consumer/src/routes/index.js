const express = require("express");
const { subscriber } = require("../controllers");
// const { publisherPhotos } = require("../controllers");

const router = express.Router();

router.get("/", subscriber );


module.exports = router;
