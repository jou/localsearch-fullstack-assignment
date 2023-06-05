<script setup lang="ts">
import { PlacesDetailEntry } from '../../models/places.ts';
import { computed } from 'vue';
import PlaceDetailsSection from './PlaceDetailsSection.vue';
import PlaceContactLink from './PlaceContactLink.vue';

const props = defineProps<{
    placeDetails?: PlacesDetailEntry;
}>();

const webLinks = computed(() =>
    (props.placeDetails?.links ?? []).filter((link) => link.type === 'web'),
);
const phoneLinks = computed(() =>
    (props.placeDetails?.links ?? []).filter((link) => link.type === 'phone'),
);
</script>

<template>
    <div v-if="placeDetails">
        <h1 class="text-3xl mb-8">{{ placeDetails.displayName }}</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <PlaceDetailsSection>
                    <template #title>Address</template>
                    {{ placeDetails.displayAddress }}
                </PlaceDetailsSection>
                <PlaceDetailsSection v-if="webLinks.length > 0" class="mt-4">
                    <template #title>Website</template>
                    <PlaceContactLink
                        v-for="link in webLinks"
                        :key="link.contactId"
                        :link="link"
                    />
                </PlaceDetailsSection>
                <PlaceDetailsSection v-if="phoneLinks.length > 0" class="mt-4">
                    <template #title>Phone</template>
                    <PlaceContactLink
                        v-for="link in phoneLinks"
                        :key="link.contactId"
                        :link="link"
                    />
                </PlaceDetailsSection>
            </div>
            <div>
                <PlaceDetailsSection>
                    <template #title>Opening Hours</template>
                    <pre>
Monday          11:30 - 15:00
Tuesday-Friday  18:30 - 00:00
                11:30 - 15:00
Saturday        18:00 - 00:00
Sunday          closed



</pre
                    >
                </PlaceDetailsSection>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
