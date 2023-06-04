import axios, { AxiosInstance } from 'axios';

const placesHttpClient = axios.create({
    baseURL: 'https://storage.googleapis.com/coding-session-rest-api/',
});
export function getPlacesHttpClient(): AxiosInstance {
    return placesHttpClient;
}
