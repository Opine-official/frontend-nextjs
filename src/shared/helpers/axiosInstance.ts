import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://opine/api',
});

export default axiosInstance;
