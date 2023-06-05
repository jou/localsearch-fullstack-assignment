import { PlacesDetailEntry, PlacesListEntry } from '../models/places.ts';
import { AxiosInstance } from 'axios';
// NOTE: (jou) The interface is a copy of the one in places-bff as well, should also consider moving this into the shared
//             package with the domain models

export interface PlacesService {
    /**
     * Get a list of available places.
     */
    listPlaces(): Promise<PlacesListEntry[]>;

    /**
     * Search for a place matching the given query.
     */
    searchPlaces(query: string): Promise<PlacesListEntry[]>;

    /**
     * Get details of the place with the given ID.
     */
    getPlaceDetails(placeId: string): Promise<PlacesDetailEntry>;
}

class AxiosPlacesService implements PlacesService {
    private _httpClient: AxiosInstance;

    constructor(httpClient: AxiosInstance) {
        this._httpClient = httpClient;
    }

    async listPlaces(): Promise<PlacesListEntry[]> {
        const response = await this._httpClient.get<PlacesListEntry[]>(
            '/places/list',
        );

        return response.data;
    }

    async searchPlaces(query: string): Promise<PlacesListEntry[]> {
        if (!query) {
            return Promise.resolve([]);
        }

        const response = await this._httpClient.get<PlacesListEntry[]>(
            '/places/search',
            { params: { q: query } },
        );

        return response.data;
    }

    async getPlaceDetails(placeId: string): Promise<PlacesDetailEntry> {
        const response = await this._httpClient.get<PlacesDetailEntry>(
            `/places/${placeId}`,
        );

        return response.data;
    }
}

export function createPlacesService(httpClient: AxiosInstance): PlacesService {
    return new AxiosPlacesService(httpClient);
}
