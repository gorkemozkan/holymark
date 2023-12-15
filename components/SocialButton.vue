<script setup lang="ts">
interface Props {
  to: string;
  icon: string;
}

defineProps<Props>();
</script>

<template>
  <UButton aria-label="Social Link" rel="nofollow" :to="to" target="_blank" variant="link" color="white">
    <UIcon class="w-5 h-5" :name="icon" />
  </UButton>
</template>
