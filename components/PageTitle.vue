<script setup lang="ts">
interface Props {
  title: string;
  loading?: boolean;
  showBack?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="mb-16">
    <ButtonBack v-if="showBack" class="mb-4"/>
    <USkeleton v-if="loading" class="h-10 w-64" />
    <h1 v-else v-bind="$attrs" class="text-2xl lg:text-3xl font-bold cursor-default">
      {{ title }}
    </h1>
  </div>
</template>
