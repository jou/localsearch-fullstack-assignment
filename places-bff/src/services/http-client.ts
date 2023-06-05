import axios, { AxiosInstance } from 'axios';

const placesHttpClient = axios.create({
    baseURL: 'https://storage.googleapis.com/coding-session-rest-api/',
});

// NOTE: (jou) exporting as a factory function for easier module mocking
export function getPlacesHttpClient(): AxiosInstance {
    return placesHttpClient;
}
