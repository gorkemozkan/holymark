<script setup lang="ts">
interface Props {
  vertical?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="flex" :class="vertical ? 'flex-col' : 'flex-row'">
    <UButton to="/" variant="link" size="lg">Home</UButton>
    <UButton to="/changelog" variant="link" size="lg">Changelog</UButton>
  </div>
</template>
