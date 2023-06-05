import { defineStore } from 'pinia';
import { ref } from 'vue';
import { PlacesDetailEntry } from '../models/places.ts';
import { LoadingState, useLoadingState } from './useLoadingState.ts';
import { usePlacesService } from '../hooks/places-service.ts';

export interface PlaceDetailStatus {
    loadingState: LoadingState;
}

export const usePlaceDetailsStore = defineStore('placeDetails', () => {
    const placesService = usePlacesService();
    const loadedPlaceDetailsById = ref<Record<string, PlacesDetailEntry>>({});

    const { state: loadingState, trackAsyncFunction: trackLoadingState } =
        useLoadingState();

    function fetchPlaceDetails(placeId: string): Promise<void> {
        return trackLoadingState(async () => {
            loadedPlaceDetailsById.value[placeId] =
                await placesService.getPlaceDetails(placeId);
        });
    }

    return {
        loadedPlaceDetailsById,
        loadingState,
        fetchPlaceDetails,
    };
});
