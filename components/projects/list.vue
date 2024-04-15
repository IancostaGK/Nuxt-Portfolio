<template>
    <div>
        <p class="mb-10">Take a look at my Github projects</p>

        <section v-if="pending"></section>
        <section v-else-if="error">Something went wrong... try Again!</section>

        <section v-else>
            <ul class="grid grid-cols-1 gap-4">
                <ProjectsItem
                    v-for="repository in repos"
                    :key="repository.id"
                    :repository
                />
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { Repository } from '~/types/repository';

const { data, error, pending } = await useFetch<Repository[]>(
    'https://api.github.com/users/piotr-jura-udemy/repos'
);

const repos = computed(() => {
    if (!data.value) return [];

    return data.value
        .filter((repo: any) => repo.description)
        .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);
});
</script>
