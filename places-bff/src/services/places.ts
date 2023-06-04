import { PlacesListEntry } from '../models/places';
import { AxiosInstance, AxiosResponse } from 'axios';
import { getPlacesHttpClient } from './http-client';

interface UpstreamPlace {
    _class: string;
}

interface PlaceLocalEntry extends UpstreamPlace {
    _class: 'ch.local.storage.model.localentry.v1.PlaceLocalEntry';
    local_entry_id: string;
    displayed_what: string;
    displayed_where: string;
}

function isPlaceLocalEntry(
    upstreamPlace: UpstreamPlace,
): upstreamPlace is PlaceLocalEntry {
    return (
        upstreamPlace._class ===
        'ch.local.storage.model.localentry.v1.PlaceLocalEntry'
    );
}

export interface PlacesService {
    /**
     * Get a list of available places.
     */
    listPlaces(): Promise<PlacesListEntry[]>;

    /**
     * Search for a place matching the given query.
     */
    searchPlaces(query: string): Promise<PlacesListEntry[]>;
}

function convertUpstreamPlaceToPlacesListEntry(
    upstreamPlace: UpstreamPlace,
): PlacesListEntry {
    if (isPlaceLocalEntry(upstreamPlace)) {
        return {
            entryId: upstreamPlace.local_entry_id,
            displayName: upstreamPlace.displayed_what,
            displayAddress: upstreamPlace.displayed_where,
        };
    }

    throw new TypeError(
        `Unexpected place type encountered: ${upstreamPlace._class}`,
    );
}

/**
 * `PlacesService` with dummy data.
 */
export class DummyPlacesServiceImpl implements PlacesService {
    static DUMMY_PLACE_IDS = [
        'GXvPAor1ifNfpF0U5PTG0w',
        'ohGSnJtMIC5nPfYRi_HTAg',
    ];

    private _httpClient: AxiosInstance;

    /**
     * @param httpClient An axios instance that returns a place by requesting `/{placeId}`.
     */
    constructor(httpClient: AxiosInstance) {
        this._httpClient = httpClient;
    }

    async listPlaces(): Promise<PlacesListEntry[]> {
        const responses: AxiosResponse<UpstreamPlace>[] = await Promise.all(
            DummyPlacesServiceImpl.DUMMY_PLACE_IDS.map((placeId) =>
                this._httpClient.get<UpstreamPlace>(`/${placeId}`),
            ),
        );

        return responses.map((response) =>
            convertUpstreamPlaceToPlacesListEntry(response.data),
        );
    }

    searchPlaces(_query: string): Promise<PlacesListEntry[]> {
        return this.listPlaces();
    }
}

let defaultPlacesServiceInstance: PlacesService | null = null;

export function defaultPlacesService(): PlacesService {
    if (!defaultPlacesServiceInstance) {
        defaultPlacesServiceInstance = new DummyPlacesServiceImpl(
            getPlacesHttpClient(),
        );
    }

    return defaultPlacesServiceInstance;
}
