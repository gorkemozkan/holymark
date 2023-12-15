<script setup lang="ts">
interface Props {
  toggle?: boolean;
}

defineProps<Props>();

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <ClientOnly>
    <UTooltip>
      <UToggle v-model="isDark" v-if="toggle" on-icon="i-heroicons-moon-solid" off-icon="i-heroicons-sun-solid" />

      <UButton
        v-else
        :icon="isDark ? 'i-heroicons-moon-solid' : 'i-heroicons-sun-solid'"
        variant="ghost"
        aria-label="Theme"
        @click="isDark = !isDark"
      />

      <template #text>
        <span>Switch {{ isDark ? "Light" : "Dark" }}</span>
      </template>
    </UTooltip>
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>
