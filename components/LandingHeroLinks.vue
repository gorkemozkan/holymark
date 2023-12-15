<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <UButton v-if="user" color="black" size="xl" to="/dashboard" icon="i-heroicons-arrow-small-left">
    Return to Dashboard
  </UButton>
  <div v-else class="flex space-x-6 items-center">
    <UButton to="/auth/login" color="black" size="xl" variant="outline">Sign In</UButton>
    <UButton to="/auth/register" size="xl" color="black" variant="solid" icon="i-mdi-rocket">
      Get Started for Free!
    </UButton>
  </div>
</template>
