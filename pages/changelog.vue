<script setup lang="ts">
useHead({
  title: "Changelog",
  link: [{ rel: "canonical", href: "https://www.holymark.co/changelog" }],
  meta: [
    { property: "og:image", content: "/og-changelog.png" },
    { name: "twitter:card", content: "/og-changelog.png" },
    { name: "twitter:image", content: "/og-changelog.png" },
  ],
});
</script>

<template>
  <PageTitle title="Changelog" show-back />
  <NuxtPage />
</template>
