<script setup lang="ts">
interface Props {
  loading?: boolean;
  icon: string;
  hint?: string;
  disabled?: boolean;
  to?: string;
  color?: string;
  shortcuts?: string[];
}

const emit = defineEmits<{
  click: [data: Event];
}>();

withDefaults(defineProps<Props>(), {
  color: "zinc",
  variant: "ghost",
});
</script>

<template>
  <UTooltip :popper="{ placement: 'top' }" :shortcuts="shortcuts">
    <UButton
      variant="ghost"
      class="text-white"
      size="xl"
      :to="to"
      :color="color"
      :disabled="disabled"
      :icon="icon"
      :loading="loading"
      @click="(event) => emit('click', event)"
    />
    <template #text>
      <span>{{ hint }}</span>
    </template>
  </UTooltip>
</template>
