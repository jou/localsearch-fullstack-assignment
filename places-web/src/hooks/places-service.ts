import { createPlacesService, PlacesService } from '../services/places.ts';
import { useHttpClient } from './http-client.ts';

const defaultPlacesService = createPlacesService(useHttpClient());

export function usePlacesService(): PlacesService {
    return defaultPlacesService;
}
