<script setup lang="ts">
useSeoMeta({
  ogUrl: "/",
});

useHead({
  link: [{ rel: "canonical", href: "https://www.holymark.co" }],
  meta: [
    { property: "og:image", content: "/og-landing.png" },
    { name: "twitter:card", content: "/og-landing.png" },
    { name: "twitter:image", content: "/og-landing.png" },
  ],
});
</script>

<template>
  <LandingHero class="mt-20 xl:mt-44" />
  <LandingFeaturesGrid class="mt-16 lg:mt-32" />
</template>
