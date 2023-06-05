<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
    <div>
        <h1 class="text-3xl mb-1 text-blue-800">{{ msg }}</h1>

        <div>
            <button
                class="font-bold py-2 px-4 rounded bg-blue-800 text-white hover:bg-blue-400"
                type="button"
                @click="count++"
            >
                count is {{ count }} (Click me!)
            </button>
        </div>
    </div>
</template>

<style scoped></style>
