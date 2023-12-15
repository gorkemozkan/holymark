<script setup lang="ts">
type Action = "update" | "delete" | "save" | "print" | "create";

interface Props {
  actions: Action[];
}

defineProps<Props>();

const store = useMarkdownStore();


const components: Record<Action, any> = {
  save: resolveComponent("MarkdownSaveButton"),
  print: resolveComponent("MarkdownPrintButton"),
  create: resolveComponent("MarkdownCreateButton"),
  update: resolveComponent("MarkdownUpdateButton"),
  delete: resolveComponent("MarkdownDeleteButton"),
};
</script>

<template>
  <div class="flex space-x-2 w-full items-center">
    <div v-for="(action, idx) in actions" :key="idx">
      <component :is="components[action]" :markdown="store.markdown" />
    </div>
  </div>
</template>
