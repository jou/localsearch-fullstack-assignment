import { defineStore } from 'pinia';
import { ref } from 'vue';
import { PlacesDetailEntry } from '../models/places.ts';
import { useLoadingState } from '../hooks/loading-state.ts';
import { usePlacesService } from '../hooks/places-service.ts';

// NOTE: (jou) This is the store that handles place detail entities.

export const usePlaceDetailsStore = defineStore('placeDetails', () => {
    const placesService = usePlacesService();
    const loadedPlaceDetailsById = ref<Record<string, PlacesDetailEntry>>({});

    const { state: loadingState, trackAsyncFunction: trackLoadingState } =
        useLoadingState();

    function fetchPlaceDetails(placeId: string): Promise<void> {
        return trackLoadingState(async () => {
            // NOTE: (jou) Place details will get stale if the app is kept open for a long time. There should be some
            //             kind of expiration for these.
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
