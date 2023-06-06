import { PlacesService } from '../services/places';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { PLACE_DETAIL_FIXTURE } from './__test__/places-fixture';
import { usePlaceDetailsStore } from './placeDetails';

function createMockPlacesService(): PlacesService {
    return {
        listPlaces: vi.fn(),
        searchPlaces: vi.fn(),
        getPlaceDetails: vi.fn(),
    };
}

let mockPlacesService = createMockPlacesService();

vi.mock('../hooks/places-service', () => {
    return {
        usePlacesService: () => mockPlacesService,
    };
});

describe('PlacesDetailsStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        mockPlacesService = createMockPlacesService();
    });

    describe('fetch details', () => {
        it('should request details from placesService', async () => {
            const expectedId = PLACE_DETAIL_FIXTURE.entryId;

            vi.mocked(mockPlacesService.getPlaceDetails).mockReturnValue(
                Promise.resolve(PLACE_DETAIL_FIXTURE),
            );

            const store = usePlaceDetailsStore();
            await store.fetchPlaceDetails(expectedId);

            expect(mockPlacesService.getPlaceDetails).toHaveBeenCalledWith(
                expectedId,
            );
        });

        it('should make the loaded item available at loadedPlaceDetailsById', async () => {
            const expectedId = PLACE_DETAIL_FIXTURE.entryId;

            vi.mocked(mockPlacesService.getPlaceDetails).mockReturnValue(
                Promise.resolve(PLACE_DETAIL_FIXTURE),
            );

            const store = usePlaceDetailsStore();
            await store.fetchPlaceDetails(expectedId);

            expect(store.loadedPlaceDetailsById[expectedId]).toEqual(
                PLACE_DETAIL_FIXTURE,
            );
        });
    });
});
