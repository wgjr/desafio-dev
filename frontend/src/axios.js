import axios from 'axios';
import store from "./redux/store";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// Add a request interceptor to include the token in the Authorization header
api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;