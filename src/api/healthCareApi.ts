import axios from "axios";


const api = axios.create({
    baseURL: "https://localhost:7284",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem("access_token")}`;

    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default api;