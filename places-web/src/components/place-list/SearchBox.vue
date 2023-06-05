<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    modelValue: string;
}>();
const emit = defineEmits<{
    (e: 'search', value: string): void;
    (e: 'update:modelValue', value: string): void;
}>();

const searchInput = computed({
    get() {
        return props.modelValue;
    },
    set(val: string) {
        emit('update:modelValue', val);
    },
});
</script>

<template>
    <form
        class="flex content-stretch items-stretch"
        @submit.prevent="$emit('search', searchInput)"
    >
        <input
            v-model="searchInput"
            class="places-input-base flex-auto me-2"
            type="text"
            placeholder="Search business entries…"
        />
        <button class="button-primary flex-none w-1/6" type="submit">
            Search
        </button>
    </form>
</template>

<style scoped></style>
