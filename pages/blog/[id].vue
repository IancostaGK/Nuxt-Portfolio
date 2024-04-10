<template>
    <div>We are on the blog page with id: {{ route.params.id }}</div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
