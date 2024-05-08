<script setup lang="ts">
import type { TocLink } from '@nuxt/content/types';

defineProps<{
    links?: TocLink[];
    level?: number;
    activeId: string | null;
}>();

const route = useRoute();
</script>

<template>
    <ul>
        <li v-for="link in links" :key="link.id">
            <NuxtLink
                :to="{ path: route.path, hash: `#${link.id}` }"
                :class="{
                    'ml-4': !!level,
                    'text-green-600': activeId === link.id,
                }"
            >
                {{ link.text }}
            </NuxtLink>
            <TocLinks
                :activeId
                :links="link.children"
                :level="level || 0 + 1"
            />
        </li>
    </ul>
</template>

<style scoped></style>
