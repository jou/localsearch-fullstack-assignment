<script setup lang="ts">
import BaseCard from '../base/BaseCard.vue';
import { PlacesListEntry } from '../../models/places.ts';

defineProps<{
    placesListItem: PlacesListEntry;
}>();
</script>

<template>
    <BaseCard class="py-4">
        <h1 class="text-2xl mb-2">{{ placesListItem.displayName }}</h1>
        <p>{{ placesListItem.displayAddress }}</p>
    </BaseCard>
</template>

<style scoped></style>
