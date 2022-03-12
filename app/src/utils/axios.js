import axiosOrigin from "axios";
import { API_URL } from "../constants";

const axios = axiosOrigin.create({
  baseURL: `${API_URL}`,
  timeout: 30000,
});

export default axios;
