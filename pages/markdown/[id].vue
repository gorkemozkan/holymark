<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getMarkdown } from "~/lib/services/markdowns";
import { string, uuid, parse, ValiError } from "valibot";

definePageMeta({
  layout: "markdown",
  middleware: [
    (to) => {
      const id = to.params.id;

      const paramSchema = string([uuid("Markdown is not valid.")]);

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

const { data, isLoading, isSuccess } = useQuery({
  queryKey: ['markdown', markdownId],
  queryHash: `markdown:${markdownId}`,
  staleTime: 0,
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



watch(isSuccess, () => {
  store.$patch({markdown:data.value?.data as Markdown})
}, { immediate: true })
</script>

<template>
    <EditorSkeleton v-if="isLoading" />
    <Editor v-else />
</template>
