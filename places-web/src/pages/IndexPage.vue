<script setup lang="ts">
import { onMounted, ref } from 'vue';

import SearchBox from '../components/place-list/SearchBox.vue';
import ResultList from '../components/place-list/ResultList.vue';
import { usePlacesStore } from '../stores/places.ts';
import { storeToRefs } from 'pinia';
import ErrorBanner from '../components/base/ErrorBanner.vue';
import LoadingIndicator from '../components/base/LoadingIndicator.vue';

const searchValue = ref('');

const placesStore = usePlacesStore();

const { listEntries, listLoadingState } = storeToRefs(placesStore);
const { fetchListEntries, searchForEntries } = placesStore;

onMounted(() => {
    fetchListEntries();
});
</script>

<template>
    <div class="w-full py-4">
        <SearchBox
            v-model="searchValue"
            @search="searchForEntries(searchValue)"
            class="mb-8"
        />
        <ErrorBanner
            v-if="listLoadingState.error"
            :error="listLoadingState.error"
        />
        <ResultList
            v-if="listLoadingState.status === 'finished'"
            :places-list-items="listEntries"
        />
        <LoadingIndicator v-if="listLoadingState.status === 'loading'" />
    </div>
</template>

<style scoped></style>
