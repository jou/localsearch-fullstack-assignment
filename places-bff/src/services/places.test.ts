import { DummyPlacesServiceImpl } from './places';
import { createAxiosMock, createMockResponse } from '../test-utils/axios-mock';
import mocked = jest.mocked;
import { AxiosInstance } from 'axios';

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
                    // Assuming that random guy doesn't provide data at some point
                    _class: 'name.jiayong.storage.model.localentry.InvalidEntry',
                }),
            );

            expect(service.listPlaces()).rejects.toThrow(TypeError);
        });
    });
});
