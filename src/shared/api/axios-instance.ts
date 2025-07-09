import axios from 'axios';

export const baseInstance = axios.create({
    baseURL: `${import.meta.env.VITE_CONTRACT_BASE_URL}`,
});

export const apiInstance = axios.create({
    baseURL: `${import.meta.env.VITE_CONTRACT_BASE_URL}/api/v1`,
});
