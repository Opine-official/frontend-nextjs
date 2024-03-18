import axios from "axios";

const minikube_backend = "https://opine/api";
const gcp_backend = "https://backend.opine.ink/api";

const axiosInstance = axios.create({
  baseURL: minikube_backend,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosInstanceMultipart = axios.create({
  baseURL: minikube_backend,
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true,
});

export default axiosInstance;
