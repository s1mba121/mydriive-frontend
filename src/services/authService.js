// authService.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const login = async (username, password) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: username,
        password,
    });
    return response.data;
};

export const register = async (username, email, phone, password) => {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
        username,
        email,
        phone,
        password,
    });
    return response.data;
};

export const verifyEmail = async (email, code) => {
    const response = await axios.post(`${BASE_URL}/auth/verify-email`, {
        email,
        code,
    });
    return response.data;
};
