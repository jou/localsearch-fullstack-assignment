<script setup lang="ts">
import { usePlaceDetailsStore } from '../stores/placeDetails.ts';
import { computed, watchEffect } from 'vue';
import { PlacesDetailEntry } from '../models/places.ts';
import PageLayout from '../components/base/PageLayout.vue';
import PlaceDetails from '../components/place-list/PlaceDetails.vue';
import { storeToRefs } from 'pinia';

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
        <PlaceDetails :place-details="place" />
    </PageLayout>
</template>

<style scoped></style>
