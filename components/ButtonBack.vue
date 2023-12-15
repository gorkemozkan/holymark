<script setup lang="ts">
const router = useRouter();
</script>

<template>
    <UButton v-bind="$attrs" variant="soft" @click="router.go(-1)" icon="i-heroicons-arrow-small-left">
      Go Back
    </UButton>
</template>
