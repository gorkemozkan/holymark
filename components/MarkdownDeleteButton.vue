<script setup lang="ts">
import { deleteMarkdown } from "~/lib/services/markdowns";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

interface Props {
  markdown: Markdown;
}

const props = defineProps<Props>();

const toast = useToast();
const store = useMarkdownStore();
const router = useRouter();
const queryClient = useQueryClient();

const showFormModal = ref(false);

const { mutate, isPending } = useMutation({
  mutationKey: ["delete-markdown"],
  mutationFn: (markdown: Markdown) => deleteMarkdown({ id: markdown.id }),
  onSuccess: () => {
    toast.add({
      icon: "i-heroicons-trash",
      title: "Success",
      description: "Successfully deleted. Here we go!",
    });

    showFormModal.value = false;

    queryClient.invalidateQueries({ queryKey: ["markdown"] });

    router.push({ name: "dashboard" });
  },
  onError: () => {
    toast.add({
      color: "red",
      title: "Error",
      description: "An error occured while trying to delete the markdown.",
    });

    showFormModal.value = false;
  },
});

function handleClick(event: Event) {
  event.stopPropagation();

  showFormModal.value = true;
}

function handleRemove() {
  mutate(props.markdown || store.markdown);
}
</script>

<template>
  <MarkdownActionButton color="red" hint="Delete Markdown" icon="i-heroicons-trash" @click="handleClick" />
  <Modal
    title="Are you sure about that?"
    description="This markdown will be deleted and cannot be restored."
    :model-value="showFormModal"
    @update:model-value="showFormModal = false"
  >
    <template #custom-icon>
      <div class="text-7xl cursor-default">🗑️</div>
    </template>
    <div class="grid grid-cols-2 gap-x-4">
      <UButton class="!bg-red-500 !text-white" :loading="isPending" block @click="handleRemove"> Yes </UButton>
      <UButton color="black" block @click="showFormModal = false"> No </UButton>
    </div>
  </Modal>
</template>
