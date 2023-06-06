import { createPlacesService, PlacesService } from '../services/places';
import { useHttpClient } from './http-client';

const defaultPlacesService = createPlacesService(useHttpClient());

export function usePlacesService(): PlacesService {
    return defaultPlacesService;
}
