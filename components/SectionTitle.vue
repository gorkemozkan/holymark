<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
}

defineProps<Props>();
</script>

<template>
  <div :class="subtitle ? 'mb-10' : 'mb-4'" class="cursor-default">
    <div class="flex items-center space-x-2 mb-1 relative w-max">
      <h2 class="text-lg sm:text-xl lg:text-2xl font-semibold">
        {{ title }}
      </h2>
    </div>
    <p v-if="subtitle" class="text-sm lg:text-base text-gray-500">{{ subtitle }}</p>
  </div>
</template>
