<script setup lang="ts">
interface Props {
  markdown: Markdown;
}


defineProps<Props>();
</script>

<template>
  <MarkdownActionButton icon="i-heroicons-printer" hint="Not Available" disabled/>
</template>
