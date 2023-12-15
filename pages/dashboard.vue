<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <div class="flex justify-between items-center">
    <SectionTitle title="Markdowns" />
    <MarkdownCreateButton />
  </div>
  <MarkdownTable />
</template>
