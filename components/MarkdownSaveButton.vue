<script setup lang="ts">
import type { Markdown } from "~/lib/types/markdown";
import { updateMarkdown } from "~/lib/services/markdowns";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

interface Props {
  markdown: Markdown;
}

const props = defineProps<Props>();
const toast = useToast();

const queryClient = useQueryClient();

const { mutate, isPending } = useMutation({
  mutationKey: ["update-markdown"],
  mutationFn: (markdown: Markdown) => {
    return updateMarkdown(markdown);
  },
  onSuccess: () => {
    return queryClient.invalidateQueries({ queryKey: ["markdown"] });
  },
  onError() {
    toast.add({
      color: "red",
      title: "Error",
      description: "An error occured while trying to save the markdown.",
    });
  },
});

function mutationHandler() {
  mutate(props.markdown);
}

useKeyboardSave(mutationHandler);
</script>

<template>
  <MarkdownActionButton
    v-bind="$attrs"
    hint="Save"
    icon="i-heroicons-wallet"
    :loading="isPending"
    :shortcuts="['⌘', 'S']"
    @click="mutationHandler"
  />
</template>
