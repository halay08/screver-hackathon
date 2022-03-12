const express = require("express");
const router = express.Router();

router.use("/survey-results", require("./survey-result"));

module.exports = router;
