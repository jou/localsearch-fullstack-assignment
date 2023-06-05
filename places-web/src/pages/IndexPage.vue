<script setup lang="ts">
import { ref } from 'vue';
import { range } from 'lodash';

import SearchBox from '../components/place-list/SearchBox.vue';
import { PlacesListEntry } from '../models/places.ts';
import ResultList from '../components/place-list/ResultList.vue';

const searchValue = ref('');

const results: PlacesListEntry[] = range(8).map(
    (i: number): PlacesListEntry => ({
        entryId: `entry id ${i}`,
        displayName: `displayName ${i}`,
        displayAddress: `displayAddress ${i}`,
    }),
);
</script>

<template>
    <div class="w-full py-4">
        <SearchBox v-model="searchValue" class="mb-8" />
        <ResultList :places-list-items="results" />
    </div>
</template>

<style scoped></style>
