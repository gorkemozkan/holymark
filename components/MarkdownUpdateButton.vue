<script setup lang="ts">
import { updateMarkdown } from "~/lib/services/markdowns";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { PutInput } from "~/lib/validations/markdowns";

interface Props {
  markdown: Markdown;
}

const toast = useToast();
const store = useMarkdownStore();
const props = defineProps<Props>();
const queryClient = useQueryClient();
const { isOpen, toggle } = useToggle();

const { mutate, isPending } = useMutation({
  mutationKey: ["update-markdown"],
  mutationFn: (markdown: Pick<PutInput, "title">) => {
    return updateMarkdown({ ...markdown, id: props.markdown.id });
  },
  onSuccess: () => {
    toggle();

    toast.add({
      icon: "i-heroicons-check",
      title: "Success",
      description: "Successfully updated. Here we go!",
    });

    queryClient.invalidateQueries({ queryKey: ["markdown"] });
  },
  onError: () => {
    toast.add({
      color: "red",
      title: "Update",
      description: "An error occured while trying to update the markdown.",
    });
  },
});

function handleClick(event: Event) {
  event.stopPropagation();
  toggle();
}

function submitHandler(markdown: Pick<PutInput, "title">) {
  mutate(markdown);

  store.markdown = {
    ...store.markdown,
    title: markdown.title,
  };
}
</script>

<template>
  <Modal v-model="isOpen" title="Update Markdown" description="Enter markdown title to update your markdown.">
    <MarkdownForm @submit="submitHandler" :loading="isPending" button-text="Update Markdown" />
    <template #custom-icon>
      <div class="text-7xl cursor-default">⚙️</div>
    </template>
  </Modal>
  <MarkdownActionButton
    hint="Update Markdown"
    icon="i-heroicons-pencil-square"
    :loading="isPending"
    @click="handleClick"
  />
</template>
