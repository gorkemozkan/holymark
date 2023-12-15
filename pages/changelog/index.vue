<script setup lang="ts">
useHead({
  title: "Changelog",
});
</script>

<template>
  <div class="space-y-6">
    <ChangelogReleases />
    <UDivider />
    <ChangelogCommits />
  </div>
</template>
