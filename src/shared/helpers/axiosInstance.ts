import axios from "axios";

const minikube_backend = "https://opine/api";
const gcp_backend = "https://backend.opine.ink/api";
const aws_api_gateway =
  "https://7zxqc7l6j8.execute-api.us-east-1.amazonaws.com";

const axiosInstance = axios.create({
  baseURL: aws_api_gateway,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosInstanceMultipart = axios.create({
  baseURL: aws_api_gateway,
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true,
});

export default axiosInstance;
