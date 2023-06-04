import { AxiosInstance, AxiosResponse } from 'axios';

/**
 * Creates an object that has the basic HTTP methods mocked. If the test subject uses methods from `AxiosInstance`
 * beyond those, you'll need to add them yourself.
 */
export function createAxiosMock(): AxiosInstance {
    const axiosMock: Partial<AxiosInstance> = {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
    };

    return axiosMock as AxiosInstance;
}

/**
 * Creates an object that can sort of pass as a response from Axios with the given value.
 */
export function createMockResponse<T>(value: T): Promise<AxiosResponse<T>> {
    const mockResponse: Partial<AxiosResponse<T>> = {
        data: value,
    };

    return Promise.resolve(mockResponse as AxiosResponse<T>);
}
