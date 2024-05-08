<script setup lang="ts">
const activeId = ref<string | null>(null);

onMounted(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                activeId.value = entry.target.id;
                break;
            }
        }
    };

    const oberver = new IntersectionObserver(callback, {
        threshold: 0.5,
        root: null,
    });

    const elements = document.querySelectorAll('h2, h3');
    for (const element of elements) {
        oberver.observe(element);
    }

    onUnmounted(() => {
        oberver.disconnect();
    });
});
</script>

<template>
    <article
        class="prose dark:prose-invert prose-pre:text-gray-700 prose-pre:bg-white dark:prose-pre:bg-gray-800 dark:prose-pre:text-white max-w-none"
    >
        <ContentDoc>
            <template #not-found>
                <div>Blog Not Found</div>
            </template>

            <template v-slot="{ doc }">
                <div class="grid grid-cols-6 gap-16">
                    <div
                        :class="{
                            'col-span-4': doc.toc,
                            'col-span-6': !doc.toc,
                        }"
                    >
                        <ContentRenderer :value="doc" />
                    </div>
                    <div class="col-span-2 not-prose" v-if="doc.toc">
                        <aside class="sticky top-8">
                            <div class="font-semibold mb-2">
                                Table of Contents
                            </div>
                            <nav>
                                <TocLinks
                                    :activeId
                                    :links="doc.body?.toc?.links"
                                />
                            </nav>
                        </aside>
                    </div>
                </div>
            </template>
        </ContentDoc>
    </article>
</template>
