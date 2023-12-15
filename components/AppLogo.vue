<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <NuxtLink
    :to="user ? '/dashboard' : '/'"
    v-bind="$attrs"
    class="uppercase tracking-widest font-black text-xl lg:text-2xl"
  >
    Holymark
  </NuxtLink>
</template>
