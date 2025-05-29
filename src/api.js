import axios from 'axios';

export const BASE_URL = "http://127.0.0.1:8001"; // or process.env.REACT_APP_BASE_URL

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
