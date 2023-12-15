<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getMarkdown } from "~/lib/services/markdowns";
import { string, uuid, parse, ValiError } from "valibot";

definePageMeta({
  layout: "markdown",
  middleware: [
    (to) => {
      const id = to.params.id;

      const paramSchema = string([uuid("Markdown is not valid dude. Sorry about that.")]);

      try {
        parse(paramSchema, id);
      } catch (error: unknown) {
        if (error instanceof ValiError) {
          throw showError(error.message);
        }
      }
    },
  ],
});

const store = useMarkdownStore();
const route = useRoute("markdown-id");

const markdownId = route.params.id;

const { isSuccess, data, isLoading, isPaused } = useQuery({
  retry: 0,
  queryKey: ["markdown", { id: markdownId }],
  queryFn: async () => {
    const response = await getMarkdown({
      id: markdownId,
    });

    if (!response.data) {
      throw showError({
        statusCode: 404,
        message: "Markdown not found, unfortunately.",
      });
    }

    return response;
  },
});

watch(isSuccess, () => store.$patch({ markdown: data.value?.data as Markdown }));
</script>

<template>
  <UAlert v-if="isPaused" title="Unable to fetch Markdown content" color="red" variant="soft"
    icon="i-heroicons-exclamation-circle"
    description="We encountered an issue while trying to retrieve Markdown content. This could be due to various reasons, such as network problems, insufficient permissions, or an error on the server side."
    class="my-12" />
  <EditorToolbar />
  <div class="mx-4">
    <MarkdownDocumentTitle :loading="isLoading" :title="(data?.data?.title as string) || ''" />
    <NuxtErrorBoundary>
      <EditorSkeleton v-if="isLoading" />
      <Editor v-else />
      <template #error="{ error }">
        {{ error }}
      </template>
    </NuxtErrorBoundary>
  </div>
</template>
