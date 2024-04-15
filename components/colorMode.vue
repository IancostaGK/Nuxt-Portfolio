<script setup lang="ts">
const colorMode = useColorMode();
const showNextMode = ref(false);

const modes = ['system', 'light', 'dark'];
const nextModeIcons: Record<string, string> = {
    system: '🌓',
    light: '☀️',
    dark: '🌑',
};

const nextMode = computed(() => {
    const currentModeIndex = modes.indexOf(colorMode.preference);
    const nextIndex = (currentModeIndex + 1) % modes.length;

    return modes[nextIndex];
});

const toggleMode = () => {
    colorMode.preference = nextMode.value;
};
</script>

<template>
    <div class="flex space-x-2 items-center">
        <span class="text-grey-500 text-sm" v-if="showNextMode"
            >Change to {{ nextMode }}</span
        >
        <button
            @click="toggleMode"
            class="hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1"
            @mouseenter="showNextMode = true"
            @mouseleave="showNextMode = false"
        >
            {{ nextModeIcons[nextMode] }}
        </button>
    </div>
</template>
