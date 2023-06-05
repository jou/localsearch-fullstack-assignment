import { readonly, Ref, ref } from 'vue';

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

export function useLoadingState(): LoadingStateHook {
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
