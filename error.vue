<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
    error: NuxtError;
}>();
</script>

<template>
    <NuxtLayout>
        <section>Oopss {{ error.statusCode }}</section>

        <h2>
            {{ error.message }}
        </h2>
    </NuxtLayout>
</template>

<style scoped></style>
