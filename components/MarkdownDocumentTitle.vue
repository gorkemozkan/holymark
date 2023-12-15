<script setup lang="ts">

interface Props {
    title: string
}


defineProps<Props>()

</script>


<template>
    <div class="cursor-default my-4">
        <span class="text-xs text-gray-400 uppercase tracking-wider font-medium">Document Name</span>
        <h1 class="text-2xl">{{ title }}</h1>
    </div>
</template>
