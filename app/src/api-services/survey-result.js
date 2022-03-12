import axios from "../utils/axios";

export const getSurveyResults = (params) =>
  axios.get("/survey-results", { params });
export const createSurveyResult = (data) => axios.post("/survey-results", data);
