<script setup lang="ts">
import BaseCard from '../base/BaseCard.vue';
import { PlacesListEntry } from '../../models/places.ts';
import { RouterLink } from 'vue-router';

defineProps<{
    placesListItem: PlacesListEntry;
}>();
</script>

<template>
    <BaseCard
        :tag-name="RouterLink"
        class="no-style py-4 interactive-border interactive-text-hover hover:bg-indigo-50"
        :to="`/places/${placesListItem.entryId}`"
    >
        <h1 class="text-2xl mb-2">{{ placesListItem.displayName }}</h1>
        <p>{{ placesListItem.displayAddress }}</p>
    </BaseCard>
</template>

<style scoped></style>
