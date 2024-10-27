import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Adjust to your backend API URL

const api = axios.create({
  baseURL: API_URL,
});

export default api;
