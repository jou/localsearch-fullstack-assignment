<script setup lang="ts">
defineProps<{
    tagName?: string;
}>();
</script>

<template>
    <component
        :is="tagName ?? 'div'"
        v-bind="$attrs"
        class="rounded-borders border-indigo-300 p-2"
    >
        <slot />
    </component>
</template>

<style scoped></style>
