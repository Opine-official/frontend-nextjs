import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend.opine.ink/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosInstanceMultipart = axios.create({
  baseURL: "https://backend.opine.ink/api",
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true,
});

export default axiosInstance;
