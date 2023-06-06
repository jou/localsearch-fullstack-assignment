import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PlacesService } from '../services/places';
import { usePlacesListStore } from './placesList';
import { createPinia, setActivePinia } from 'pinia';
import { PLACES_FIXTURE } from './__test__/places-fixture';

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

describe('PlacesListStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        mockPlacesService = createMockPlacesService();
    });

    describe('fetching', () => {
        it('should call get the list of places from placesService', async () => {
            const store = usePlacesListStore();
            await store.fetchListEntries();

            expect(mockPlacesService.listPlaces).toHaveBeenCalled();
        });

        it('should store fetched places in the store', async () => {
            vi.mocked(mockPlacesService.listPlaces).mockReturnValue(
                Promise.resolve(PLACES_FIXTURE),
            );

            const store = usePlacesListStore();
            await store.fetchListEntries();

            expect(store.listEntries).toEqual(PLACES_FIXTURE);
        });

        describe('loading state', () => {
            it('should be `not-started` initially', () => {
                const store = usePlacesListStore();

                expect(store.listLoadingState.status).toBe('not-started');
            });

            it('should transition to `loading` and then `finished` on success', async () => {
                const store = usePlacesListStore();

                vi.mocked(mockPlacesService.listPlaces).mockReturnValue(
                    Promise.resolve(PLACES_FIXTURE),
                );

                const fetchPromise = store.fetchListEntries();
                expect(store.listLoadingState.status).toBe('loading');

                await fetchPromise;
                expect(store.listLoadingState.status).toBe('finished');
            });

            it('should transition to `loading` and then `failed` when there was an error', async () => {
                const store = usePlacesListStore();

                vi.mocked(mockPlacesService.listPlaces).mockReturnValue(
                    Promise.reject(new Error()),
                );

                const fetchPromise = store.fetchListEntries();
                expect(store.listLoadingState.status).toBe('loading');

                await fetchPromise;
                expect(store.listLoadingState.status).toBe('error');
            });

            it('should populate the error property on error', async () => {
                const store = usePlacesListStore();
                const expectedError = new Error();

                vi.mocked(mockPlacesService.listPlaces).mockReturnValue(
                    Promise.reject(expectedError),
                );

                await store.fetchListEntries();

                expect(store.listLoadingState.error).toBe(expectedError);
            });

            it('should clear error when issuing a new fetch', async () => {
                const store = usePlacesListStore();
                vi.mocked(mockPlacesService.listPlaces).mockReturnValueOnce(
                    Promise.reject(new Error()),
                );
                vi.mocked(mockPlacesService.listPlaces).mockReturnValueOnce(
                    Promise.resolve(PLACES_FIXTURE),
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

    describe('searching', () => {
        it('should call pass the query placesService', async () => {
            const expectedQuery = 'expected query';

            const store = usePlacesListStore();
            await store.searchForEntries(expectedQuery);

            expect(mockPlacesService.searchPlaces).toHaveBeenCalledWith(
                expectedQuery,
            );
        });

        it('should store found places in the store', async () => {
            vi.mocked(mockPlacesService.searchPlaces).mockReturnValue(
                Promise.resolve(PLACES_FIXTURE),
            );

            const store = usePlacesListStore();
            await store.searchForEntries('');

            expect(store.listEntries).toEqual(PLACES_FIXTURE);
        });

        describe('loading state', () => {
            it('should be `not-started` initially', () => {
                const store = usePlacesListStore();

                expect(store.listLoadingState.status).toBe('not-started');
            });

            it('should transition to `loading` and then `finished` on success', async () => {
                const store = usePlacesListStore();

                vi.mocked(mockPlacesService.searchPlaces).mockReturnValue(
                    Promise.resolve(PLACES_FIXTURE),
                );

                const fetchPromise = store.searchForEntries('');
                expect(store.listLoadingState.status).toBe('loading');

                await fetchPromise;
                expect(store.listLoadingState.status).toBe('finished');
            });

            it('should transition to `loading` and then `failed` when there was an error', async () => {
                const store = usePlacesListStore();

                vi.mocked(mockPlacesService.searchPlaces).mockReturnValue(
                    Promise.reject(new Error()),
                );

                const fetchPromise = store.searchForEntries('');
                expect(store.listLoadingState.status).toBe('loading');

                await fetchPromise;
                expect(store.listLoadingState.status).toBe('error');
            });

            it('should populate the error property on error', async () => {
                const store = usePlacesListStore();
                const expectedError = new Error();

                vi.mocked(mockPlacesService.searchPlaces).mockReturnValue(
                    Promise.reject(expectedError),
                );

                await store.searchForEntries('');

                expect(store.listLoadingState.error).toBe(expectedError);
            });

            it('should clear error when issuing a new fetch', async () => {
                const store = usePlacesListStore();
                vi.mocked(mockPlacesService.searchPlaces).mockReturnValueOnce(
                    Promise.reject(new Error()),
                );
                vi.mocked(mockPlacesService.searchPlaces).mockReturnValueOnce(
                    Promise.resolve(PLACES_FIXTURE),
                );

                // First fetch, fails
                await store.searchForEntries('');

                // Second fetch, should be successful
                await store.searchForEntries('');

                expect(store.listLoadingState.status).toBe('finished');
                expect(store.listLoadingState.error).toBeNull();
            });
        });
    });
});
