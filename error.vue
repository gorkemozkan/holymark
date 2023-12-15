<script setup lang="ts">
const handleError = () => clearError({ redirect: "/" });

interface Props {
  error: Error;
}

defineProps<Props>();
</script>

<template>
  <NuxtLayout name="404">
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-white text-5xl font-bold tracking-widest uppercase">Not Found</h1>

      <div v-if="error.message" class="text-gray-500 mt-2">{{ error.message }}</div>
      <UButton @click="handleError" block class="mt-6">Return to home</UButton>
    </div>
  </NuxtLayout>
</template>
