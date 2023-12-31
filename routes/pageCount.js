const express = require("express");
const router = express.Router();
const pageCountController = require("../controller/pageCount");


router.post("/calculate", pageCountController.pageCount);

module.exports = router;
