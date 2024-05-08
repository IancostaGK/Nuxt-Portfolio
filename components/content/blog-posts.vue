<script setup lang="ts">
import type { Blog } from '~/types/blog';

const { data } = await useAsyncData('blog-list', () =>
    queryContent('/blog')
        .where({ _path: { $ne: '/blog' } })
        .only(['_path', 'title', 'publishedAt'])
        .sort({ publishedAt: -1 })
        .find()
);

const posts = computed(() => {
    if (!data.value) return [];

    let lastYear: number | null = null;
    const result: Blog[] = [];

    for (const post of data.value) {
        const year = new Date(post.publishedAt).getFullYear();
        const displayYear = year !== lastYear;
        lastYear = year;
        result.push({ ...post, displayYear, year });
    }

    return result;
});
</script>

<template>
    <section class="not-prose font-mono">
        <div class="column text-gry-400 text-sm">
            <div>Date</div>
            <div>Title</div>
        </div>
        <ul>
            <li v-for="post in posts" :key="post._path">
                <NuxtLink
                    :to="post._path"
                    class="column hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <div
                        class="text-gray-500"
                        :class="{ 'text-transparent': !post.displayYear }"
                    >
                        {{ post.year }}
                    </div>
                    <div>{{ post.title }}</div>
                </NuxtLink>
            </li>
        </ul>
    </section>
</template>

<style scoped>
.column {
    @apply flex items-center space-x-8 py-2 border-b border-gray-200 dark:border-b-gray-700;
}
</style>
