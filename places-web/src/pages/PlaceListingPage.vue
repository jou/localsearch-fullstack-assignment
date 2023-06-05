<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import SearchBox from '../components/place-list/SearchBox.vue';
import ResultList from '../components/place-list/ResultList.vue';
import { usePlacesListStore } from '../stores/placesList.ts';
import { storeToRefs } from 'pinia';
import ErrorBanner from '../components/base/ErrorBanner.vue';
import LoadingIndicator from '../components/base/LoadingIndicator.vue';
import PageLayout from '../components/base/PageLayout.vue';

const searchValue = ref('');

const placesStore = usePlacesListStore();

const { listEntries, listLoadingState } = storeToRefs(placesStore);
const { fetchListEntries, searchForEntries } = placesStore;

onBeforeMount(() => {
    fetchListEntries();
});
</script>

<template>
    <PageLayout>
        <SearchBox
            v-model="searchValue"
            class="mb-8"
            @search="searchForEntries(searchValue)"
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
    </PageLayout>
</template>

<style scoped></style>
