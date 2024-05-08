<script setup lang="ts">
import type { Blog } from '~/types/blog';

const props = defineProps<{
    limit?: number | null;
}>();

const { data } = await useAsyncData('blog-list', () => {
    const query = queryContent('/blog')
        .where({ _path: { $ne: '/blog' } })
        .only(['_path', 'title', 'publishedAt'])
        .sort({ publishedAt: -1 });
    if (props.limit) {
        query.limit(props.limit);
    }
    return query.find();
});

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
    <slot :posts="posts">
        <section class="not-prose font-mono">
            <div class="column text-gray-400 text-sm">
                <div>date</div>
                <div>title</div>
            </div>

            <ul>
                <li v-for="post in posts" :key="post._path">
                    <NuxtLink
                        :to="post._path"
                        class="column hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <div
                            :class="{
                                'text-white dark:text-gray-900':
                                    !post.displayYear,
                                'text-gray-400 dark:text-gray-500':
                                    post.displayYear,
                            }"
                        >
                            {{ post.year }}
                        </div>
                        <div>{{ post.title }}</div>
                    </NuxtLink>
                </li>
            </ul>
        </section>
    </slot>
</template>

<style scoped>
.column {
    @apply flex items-center space-x-8 py-2 border-b border-gray-200 dark:border-b-gray-700;
}
</style>
