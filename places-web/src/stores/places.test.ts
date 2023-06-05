import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PlacesService } from '../services/places.ts';
import { usePlacesStore } from './places.ts';
import { createPinia, setActivePinia } from 'pinia';
import { ALL_LIST_PLACES } from './__test__/places-fixture.ts';

function createMockPlacesService(): PlacesService {
    return {
        listPlaces: vi.fn(),
        searchPlaces: vi.fn(),
    };
}

let mockPlacesService = createMockPlacesService();

vi.mock('../hooks/places-service', () => {
    return {
        usePlacesService: () => mockPlacesService,
    };
});

describe('PlacesStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        mockPlacesService = createMockPlacesService();
    });

    describe('fetching', () => {
        it('should call get the list of places from placesService', async () => {
            const store = usePlacesStore();
            await store.fetchListEntries();

            expect(mockPlacesService.listPlaces).toHaveBeenCalled();
        });

        it('should store fetched places in the store', async () => {
            vi.mocked(mockPlacesService.listPlaces).mockReturnValue(
                Promise.resolve(ALL_LIST_PLACES),
            );

            const store = usePlacesStore();
            await store.fetchListEntries();

            expect(store.listEntries).toEqual(ALL_LIST_PLACES);
        });

        describe('loading state', () => {
            it('should be `not-started` initially', () => {
                const store = usePlacesStore();

                expect(store.listLoadingState.status).toBe('not-started');
            });

            it('should transition to `loading` and then `finished` on success', async () => {
                const store = usePlacesStore();

                vi.mocked(mockPlacesService.listPlaces).mockReturnValue(
                    Promise.resolve(ALL_LIST_PLACES),
                );

                const fetchPromise = store.fetchListEntries();
                expect(store.listLoadingState.status).toBe('loading');

                await fetchPromise;
                expect(store.listLoadingState.status).toBe('finished');
            });

            it('should transition to `loading` and then `failed` when there was an error', async () => {
                const store = usePlacesStore();

                vi.mocked(mockPlacesService.listPlaces).mockReturnValue(
                    Promise.reject(new Error()),
                );

                const fetchPromise = store.fetchListEntries();
                expect(store.listLoadingState.status).toBe('loading');

                await fetchPromise;
                expect(store.listLoadingState.status).toBe('error');
            });

            it('should populate the error property on error', async () => {
                const store = usePlacesStore();
                const expectedError = new Error();

                vi.mocked(mockPlacesService.listPlaces).mockReturnValue(
                    Promise.reject(expectedError),
                );

                await store.fetchListEntries();

                expect(store.listLoadingState.error).toBe(expectedError);
            });

            it('should clear error when issuing a new fetch', async () => {
                const store = usePlacesStore();
                vi.mocked(mockPlacesService.listPlaces).mockReturnValueOnce(
                    Promise.reject(new Error()),
                );
                vi.mocked(mockPlacesService.listPlaces).mockReturnValueOnce(
                    Promise.resolve(ALL_LIST_PLACES),
                );

                // First fetch, fails
                await store.fetchListEntries();

                // Second fetch, should be successful
                await store.fetchListEntries();

                expect(store.listLoadingState.status).toBe('finished');
                expect(store.listLoadingState.error).toBeNull();
            });
        });
    });
});
