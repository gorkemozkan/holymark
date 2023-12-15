<script setup lang="ts">
import { createMarkdown } from "~/lib/services/markdowns";
import type { PostInput } from "~/lib/validations/markdowns";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

interface Props {
  markdown?: Markdown;
}

defineProps<Props>();

const router = useRouter();
const toast = useToast();

const queryClient = useQueryClient();

const showFormModal = ref(false);

const { mutate, isPending } = useMutation({
  mutationKey: ["create-markdown"],
  mutationFn: (form: PostInput) => createMarkdown({ title: form.title }),
  onSuccess: (response) => {
    queryClient.invalidateQueries({ queryKey: ["markdown"] });

    toast.add({
      icon: "i-heroicons-check",
      title: `Success`,
      description: "Successfully created. Here we go!",
    });

    router.push({
      name: "markdown-id",
      params: { id: response.data?.id as Markdown["id"] },
    });
  },
  onError: (error: Error) => {
    const errorMessage =
      error?.status === 409 ? "The markdown you are trying to create already exists." : error.message;

    toast.add({
      color: "red",
      title: "Error",
      description: errorMessage,
    });
  },
});

function submitHandler(markdown: { title: Markdown["title"] }) {
  mutate(markdown);
}
</script>

<template>
  <Modal v-model="showFormModal" title="Create Markdown" description="Enter markdown title to create your markdown.">
    <template #custom-icon>
      <div class="text-7xl cursor-default">✨</div>
    </template>
    <MarkdownForm button-text="Create Markdown" :loading="isPending" @submit="submitHandler" />
  </Modal>
  <MarkdownActionButton icon="i-heroicons-document-plus" :loading="isPending" @click="showFormModal = true" hint="Create Markdown">
    <slot />
  </MarkdownActionButton>
</template>
