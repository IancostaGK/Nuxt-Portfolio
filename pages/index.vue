<template>
    <div>Index Page</div>
</template>

<script setup>
useSeoMeta({
    title: 'Main Page',
    description: 'This is the main Page',
    ogTitle: 'Main Page',
    ogDescription: '[og:description]',
    ogImage: '[og:image]',
    ogUrl: '[og:url]',
    twitterTitle: 'Main Page',
    twitterDescription: '[twitter:description]',
    twitterImage: '[twitter:image]',
    twitterCard: 'summary',
});

useHead({
    htmlAttrs: {
        lang: 'en',
    },
    link: [
        {
            rel: 'icon',
            type: 'image/png',
        },
    ],
});
</script>
