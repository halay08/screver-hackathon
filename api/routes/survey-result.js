const express = require("express");
const {
  getAllSurveyResults,
  createSurveyResult,
} = require("../controllers/survey-result");
const asyncRequest = require("../lib/async-request");
const router = express.Router();

router.post("/", asyncRequest(createSurveyResult));
router.get("/", asyncRequest(getAllSurveyResults));

module.exports = router;
