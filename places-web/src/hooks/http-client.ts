import axios, { AxiosInstance } from 'axios';

const defaultAxiosInstance = axios.create({
    baseURL: import.meta.env.PLACES_WEB_BFF_BASE_URL ?? '/',
});

export function useHttpClient(): AxiosInstance {
    return defaultAxiosInstance;
}
