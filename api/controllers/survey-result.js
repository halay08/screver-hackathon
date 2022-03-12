const SurveyResult = require("../models/survey-result");
const ResponseUtil = require("../lib/response-util");

const createSurveyResult = async (req, res) => {
  const { coordinates } = req.body;
  const result = await SurveyResult.create({ coordinates });
  res.json(ResponseUtil.success({ data: result }));
};

const getAllSurveyResults = async (req, res) => {
  const result = await SurveyResult.find();
  res.json(ResponseUtil.success({ data: result }));
};

module.exports = {
  getAllSurveyResults,
  createSurveyResult,
};
