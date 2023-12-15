<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title: string;
  description: string;
  icon?: string;
  preventClose?:boolean
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [model: boolean];
}>();

function close() {
  emit("update:modelValue", !props.modelValue);
}
</script>

<template>
  <UModal :prevent-close="preventClose" :model-value="modelValue" @close="close">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <UButton color="red" variant="soft" icon="i-heroicons-x-mark" class="-my-1" @click="close" />
        </div>
      </template>
      <template #default>
        <div class="text-center space-y-8 my-4">
          <UIcon v-if="icon" :name="icon" class="text-7xl" />
          <slot v-else-if="$slots['custom-icon']" name="custom-icon" />
          <div v-else class="text-7xl cursor-default">✨</div>
          <p class="text-gray-500 dark:text-white text-sm">{{ description }}</p>
        </div>
      </template>
      <template #footer>
        <slot v-if="$slots['default']" />
        <UButton v-else color="black" @click="close" block size="lg">Close</UButton>
      </template>
    </UCard>
  </UModal>
</template>
