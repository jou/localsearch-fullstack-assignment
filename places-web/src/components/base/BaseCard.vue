<script setup lang="ts">
defineProps<{
    tagName?: string;
}>();
</script>

<template>
    <component
        :is="tagName ?? 'div'"
        v-bind="$attrs"
        class="block rounded-borders p-2"
    >
        <slot />
    </component>
</template>

<style scoped></style>
