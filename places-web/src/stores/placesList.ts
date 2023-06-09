import { defineStore } from 'pinia';
import { ref } from 'vue';

import { PlacesListEntry } from '../models/places';
import { usePlacesService } from '../hooks/places-service';
import { useLoadingState } from '../hooks/loading-state';

// NOTE: (jou) This is the store that handles listing & searching of places.

export const usePlacesListStore = defineStore('placesList', () => {
    const placesService = usePlacesService();

    const listEntries = ref<PlacesListEntry[]>([]);

    const {
        state: listLoadingState,
        trackAsyncFunction: trackListLoadingState,
    } = useLoadingState();

    function fetchListEntries(): Promise<void> {
        return trackListLoadingState(async () => {
            listEntries.value = await placesService.listPlaces();
        });
    }

    function searchForEntries(query: string): Promise<void> {
        return trackListLoadingState(async () => {
            listEntries.value = await placesService.searchPlaces(query);
        });
    }

    return {
        listEntries,
        listLoadingState,
        fetchListEntries,
        searchForEntries,
    };
});
