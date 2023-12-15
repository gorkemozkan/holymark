<script setup lang="ts">
interface Props {
  side: "left" | "right";
}

withDefaults(defineProps<Props>(), {
  side: "left",
});

const route = useRoute();
const { isOpen, toggle } = useToggle();

watch(
  () => route.path,
  () => {
    if (isOpen) {
      isOpen.value = false;
    }
  }
);
</script>

<template>
  <div>
    <UTooltip text="Explore">
      <UButton icon="i-heroicons-bars-4" variant="ghost" @click="toggle" />
    </UTooltip>
    <Teleport to="body">
      <USlideover :side="side" :model-value="isOpen" @close="toggle">
        <UCard class="flex flex-col flex-1" :ui="{
          body: { base: 'flex-1 ' },
          ring: '',
          divide: 'divide-y divide-gray-100',
        }">
          <template #header>
            <div class="flex items-center justify-between">
              <AppLogo />
              <UButton color="red" variant="soft" icon="i-heroicons-x-mark" @click="toggle" />
            </div>
          </template>
          <template #default>
            <slot />
          </template>
          <template #footer>
            <slot name="footer" />
          </template>
        </UCard>
      </USlideover>
    </Teleport>
  </div>
</template>
