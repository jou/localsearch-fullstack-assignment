<script setup lang="ts">
import { usePlaceDetailsStore } from '../stores/placeDetails.ts';
import { computed, watchEffect } from 'vue';
import { PlacesDetailEntry } from '../models/places.ts';
import PageLayout from '../components/base/PageLayout.vue';
import PlaceDetails from '../components/place-details/PlaceDetails.vue';
import { storeToRefs } from 'pinia';
import ErrorBanner from '../components/base/ErrorBanner.vue';
import LoadingIndicator from '../components/base/LoadingIndicator.vue';

const props = defineProps<{
    placeId: string;
}>();

const placeDetailsStore = usePlaceDetailsStore();

const { loadingState, loadedPlaceDetailsById } = storeToRefs(placeDetailsStore);

watchEffect(async () => {
    if (props.placeId) {
        await placeDetailsStore.fetchPlaceDetails(props.placeId);
    }
});

const place = computed<PlacesDetailEntry | undefined>(
    () => loadedPlaceDetailsById.value[props.placeId],
);
</script>

<template>
    <PageLayout>
        <ErrorBanner v-if="loadingState.error" :error="loadingState.error" />
        <PlaceDetails
            v-if="loadingState.status === 'finished'"
            :place-details="place"
        />
        <LoadingIndicator v-if="loadingState.status === 'loading'" />
    </PageLayout>
</template>

<style scoped></style>
