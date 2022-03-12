const mongoose = require("mongoose");
const toJSON = require("./plugins/toJSON");

const surveyResultSchema = mongoose.Schema(
  {
    coordinates: {
      x: {
        type: Number,
        required: true,
      },
      y: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);
surveyResultSchema.plugin(toJSON);

const SurveyResult = mongoose.model("SurveyResult", surveyResultSchema);

module.exports = SurveyResult;
