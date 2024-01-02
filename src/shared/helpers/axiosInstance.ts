import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://opine/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default axiosInstance;
