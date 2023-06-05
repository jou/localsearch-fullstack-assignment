<script setup lang="ts">
defineProps<{
    error?: Error;
}>();
</script>

<template>
    <div class="bg-red-700 text-white text-center text-xl py-8 rounded-md">
        An Error occurred - {{ error }}
    </div>
</template>

<style scoped></style>
