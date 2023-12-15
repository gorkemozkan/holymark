<script setup lang="ts">

interface Props {
  title : string
}

defineProps<Props>()
</script>



<template>
  <UContainer class="dark:bg-transparent py-3 w-full border rounded-lg dark:border-zinc-900 shadow-sm">
    <h2 class="font-semibold text-gray-400 uppercase text-sm tracking-wider">
      {{ title }}
    </h2>
    <UDivider  class="my-4" />
    <slot />

    <slot name="bottom" />
  </UContainer>
</template>
