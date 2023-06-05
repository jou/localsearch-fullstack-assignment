<script setup lang="ts">
import { PlaceLink } from '../../../models/places.ts';

defineProps<{
    link: PlaceLink;
}>();
</script>

<template>
    <a class="block" :href="link.uri" target="_blank" rel="noopener">
        {{ link.label }}
    </a>
</template>

<style scoped></style>
