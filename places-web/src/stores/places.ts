import { defineStore } from 'pinia';
import { readonly, Ref, ref } from 'vue';

import { PlacesListEntry } from '../models/places';
import { usePlacesService } from '../hooks/places-service';

export type LoadingStatus = 'not-started' | 'loading' | 'finished' | 'error';

export interface LoadingState {
    status: LoadingStatus;
    error: Error | null;
}

export interface LoadingStateHook {
    state: Readonly<Ref<LoadingState>>;
    trackPromise(promise: Promise<unknown>): Promise<void>;
    trackAsyncFunction(fn: () => Promise<unknown>): Promise<void>;
}

function useLoadingState(): LoadingStateHook {
    const loadingState = ref<LoadingState>({
        status: 'not-started',
        error: null,
    });

    async function trackPromise(promise: Promise<unknown>): Promise<void> {
        loadingState.value = {
            status: 'loading',
            error: null,
        };

        try {
            await promise;
            loadingState.value.status = 'finished';
        } catch (e) {
            loadingState.value = {
                status: 'error',
                error: e instanceof Error ? e : new Error('Unknown error'),
            };
        }
    }

    async function trackAsyncFunction(
        fn: () => Promise<unknown>,
    ): Promise<void> {
        return trackPromise(fn());
    }

    return {
        state: readonly(loadingState),
        trackPromise,
        trackAsyncFunction,
    };
}

export const usePlacesStore = defineStore('places', () => {
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

    return { listEntries, fetchListEntries, listLoadingState };
});
