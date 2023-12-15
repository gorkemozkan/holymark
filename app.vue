<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    const appName = "Holymark: The Markdown Preview App";
    return titleChunk ? `${titleChunk} - ${appName}` : `${appName}`;
  },
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>
