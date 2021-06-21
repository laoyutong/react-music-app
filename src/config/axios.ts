import axios from "axios";
import { requestBaseURL } from "./index";

const axiosInstance = axios.create({
  baseURL: requestBaseURL,
});

axiosInstance.interceptors.response.use((res) => res.data);

export default axiosInstance;
