<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <PageTitle title="Welcome back ✨" />
   <div class="flex justify-between items-center">
      <SectionTitle title="Markdowns" />
      <MarkdownCreateButton />
    </div>
  <MarkdownTable :keys="['title','actions']"/>
</template>
