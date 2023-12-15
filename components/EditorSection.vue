<script setup lang="ts">

interface Props {
  title : string
}

defineProps<Props>()
</script>



<template>
  <UContainer class="dark:bg-transparent py-3 w-full border dark:border-zinc-900 shadow-sm">
    <h2 class="text-gray-400 uppercase text-sm tracking-widest cursor-default">
      {{ title }}
    </h2>
    <UDivider  class="my-4" />
    <slot />

    <slot name="bottom" />
  </UContainer>
</template>
