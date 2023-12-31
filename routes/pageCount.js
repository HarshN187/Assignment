const express = require("express");
const router = express.Router();
const pageCountController = require("../controller/pageCount");
const testURL = require("../middleware/testURL");

router.post("/getPhilosophyPage", testURL, pageCountController.pageCount);

module.exports = router;
