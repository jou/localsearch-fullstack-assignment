<script setup lang="ts">
import { onMounted, ref } from 'vue';

import SearchBox from '../components/place-list/SearchBox.vue';
import ResultList from '../components/place-list/ResultList.vue';
import { usePlacesStore } from '../stores/places.ts';
import { storeToRefs } from 'pinia';

const searchValue = ref('');

const placesStore = usePlacesStore();

const { listEntries, listLoadingState } = storeToRefs(placesStore);
const { fetchListEntries } = placesStore;

onMounted(() => {
    fetchListEntries();
});
</script>

<template>
    <div class="w-full py-4">
        <SearchBox v-model="searchValue" class="mb-8" />
        <ResultList
            v-if="listLoadingState.status === 'finished'"
            :places-list-items="listEntries"
        />
    </div>
</template>

<style scoped></style>
