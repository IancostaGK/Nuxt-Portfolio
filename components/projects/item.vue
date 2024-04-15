<template>
    <li
        class="border border-gray-200 rounded-sm p-4 hover:bg-gray-100 font-mono"
    >
        <a :href="repository.html_url" target="_blank">
            <div class="flex items-center justify-between">
                <div class="font-semibold">
                    {{ repository.name }}
                </div>
                <div>{{ repository.stargazers_count }}</div>
            </div>
            <p class="text-sm">
                {{ repository.description }}
            </p>
        </a>
    </li>
</template>

<script setup lang="ts">
import type { Repository } from '~/types/repository';

defineProps<{ repository: Repository }>();
</script>
