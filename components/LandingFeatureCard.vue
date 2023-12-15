<script setup lang="ts">
interface Props {
  icon: string;
  title: string;
  description: string;
}

defineProps<Props>();
</script>

<template>
  <UCard
    :ui="{
      background: 'dark:hover:bg-white dark:hover:text-black dark:bg-transparent',
      ring: 'ring-1 ring-gray-200 dark:ring-zinc-800 dark:hover:ring-gray-100 hover:ring-gray-300',
    }"
  >
    <div class="flex flex-col space-y-4">
      <UIcon class="w-8 h-8" :name="icon" />
      <span>{{ title }}</span>
      <p>{{ description }}</p>
    </div>
  </UCard>
</template>
