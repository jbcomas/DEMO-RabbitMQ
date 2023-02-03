const express = require("express");
const { publisherPosts, publisherUser } = require("../controllers");

const router = express.Router();

router.get("/posts", publisherPosts);
router.get("/user", publisherUser);
router.get("/usuarios", publisherUser);

module.exports = router;
