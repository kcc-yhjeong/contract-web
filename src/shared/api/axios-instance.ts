import axios from 'axios';

export const baseInstance = axios.create({
    baseURL: `${import.meta.env.VITE_CONTRACT_API_BASE_URL}/api/v1`,
});
