<script setup lang="ts">
const store = useMarkdownStore();

const preview = ref("");

store.$subscribe((subscriber) => {
  if (subscriber.storeId !== "markdown") return;

  preview.value = store.getSanitazedParsedMarkdown;
});

onMounted(() => {
  preview.value = store.getSanitazedParsedMarkdown;
});
</script>

<template>
  <EditorSection title="Preview" >
    <div class="md-preview" v-html="preview"></div>
  </EditorSection>
</template>
