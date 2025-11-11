import axios from "axios";  

const USER_SERVICE_URL = "http://localhost:5001/api/users";
const PRODUCT_SERVICE_URL = "http://localhost:5002/api/products";
const ORDER_SERVICE_URL = "http://localhost:5003/api/orders";

export const userApi = axios.create({
    baseURL: USER_SERVICE_URL,
})

export const productApi = axios.create({
    baseURL: PRODUCT_SERVICE_URL,
})

export const orderApi = axios.create({
    baseURL: ORDER_SERVICE_URL,
})

// Khi user đã đăng nhập, ta lưu token vào localStorage
orderApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});