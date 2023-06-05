<script setup lang="ts">
import { PlacesListEntry } from '../../models/places.ts';
import ResultListItem from './ResultListItem.vue';

defineProps<{
    placesListItems: PlacesListEntry[];
}>();
</script>

<template>
    <div class="grid grid-cols-3 gap-2">
        <template v-if="placesListItems.length > 0">
            <ResultListItem
                v-for="placesListItem in placesListItems"
                :key="placesListItem.entryId"
                :places-list-item="placesListItem"
            />
        </template>
        <p v-else>No results</p>
    </div>
</template>

<style scoped></style>
