<script setup lang="ts">
import type { TocLink } from '@nuxt/content/types';

defineProps<{
    links?: TocLink[];
    level?: number;
}>();

const route = useRoute();
</script>

<template>
    <ul>
        <li v-for="link in links" :key="link.id">
            <NuxtLink
                :to="{ path: route.path, hash: `#${link.id}` }"
                :class="{ 'ml-4': !!level }"
            >
                {{ link.text }}
            </NuxtLink>
            <TocLinks :links="link.children" :level="level || 0 + 1" />
        </li>
    </ul>
</template>

<style scoped></style>
