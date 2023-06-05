import { DummyPlacesServiceImpl } from './places';
import { createAxiosMock, createMockResponse } from '../test-utils/axios-mock';
import mocked = jest.mocked;
import { AxiosInstance } from 'axios';
import { ALL_LIST_PLACES, LIST_PLACES } from './__test__/places-fixture';

describe('DummyPlacesServiceImpl', () => {
    let mockHttpClient: AxiosInstance;
    let service: DummyPlacesServiceImpl;

    beforeEach(() => {
        mockHttpClient = createAxiosMock();
        service = new DummyPlacesServiceImpl(mockHttpClient);
    });

    describe('#listPlaces()', () => {
        it('should list by requesting all known place IDs', async () => {
            mocked(mockHttpClient.get).mockReturnValue(
                createMockResponse({
                    _class: 'ch.local.storage.model.localentry.v1.PlaceLocalEntry',
                }),
            );

            const expectedRequestPaths =
                DummyPlacesServiceImpl.DUMMY_PLACE_IDS.map(
                    (placeId) => `/${placeId}`,
                );

            // We're just testing for side effects here, ignore returned value
            void (await service.listPlaces());

            const actualRequestPaths = mocked(
                mockHttpClient.get,
            ).mock.calls.map(([path]) => path);

            expect(actualRequestPaths).toEqual(expectedRequestPaths);
        });

        it('should throw error when a unknown _class value is encountered', () => {
            mocked(mockHttpClient.get).mockReturnValue(
                createMockResponse({
                    _class: 'com.example.storage.model.localentry.InvalidEntry',
                }),
            );

            expect(service.listPlaces()).rejects.toThrow(TypeError);
        });
    });

    describe('#searchPlaces()', () => {
        it('should match display name', async () => {
            service.listPlaces = jest.fn();
            mocked(service.listPlaces).mockReturnValueOnce(
                Promise.resolve(ALL_LIST_PLACES),
            );

            const results = await service.searchPlaces('Weyland');

            expect(results).toContain(LIST_PLACES.WEYLAND_YUTANI);
            expect(results).not.toContain(LIST_PLACES.CYBERDYNE);
        });

        it('should match display address', async () => {
            service.listPlaces = jest.fn();
            mocked(service.listPlaces).mockReturnValueOnce(
                Promise.resolve(ALL_LIST_PLACES),
            );

            const results = await service.searchPlaces('Exempleville');

            expect(results).toContain(LIST_PLACES.CYBERDYNE);
            expect(results).not.toContain(LIST_PLACES.WEYLAND_YUTANI);
        });

        it('should match case insensitively', async () => {
            service.listPlaces = jest.fn();
            mocked(service.listPlaces).mockReturnValue(
                Promise.resolve(ALL_LIST_PLACES),
            );

            const lowerCaseResults = await service.searchPlaces('weyland');
            const mixedCaseResults = await service.searchPlaces('weyLanD');

            expect(lowerCaseResults).toEqual(mixedCaseResults);
        });
    });

    describe('getPlaceDetails()', () => {
        it('should request the given place ID', async () => {
            mocked(mockHttpClient.get).mockReturnValue(
                createMockResponse({
                    _class: 'ch.local.storage.model.localentry.v1.PlaceLocalEntry',
                }),
            );

            const expectedId = 'expectedId';

            // We're just testing for side effects here, ignore returned value
            void (await service.getPlaceDetails(expectedId));

            expect(mockHttpClient.get).toHaveBeenCalledWith(`/${expectedId}`);
        });
    });
});
