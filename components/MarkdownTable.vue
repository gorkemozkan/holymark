<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getMarkdowns } from "~/lib/services/markdowns";

const router = useRouter();

const columns = [
  {
    key: "title",
    label: "Title",
  },
]

const { data, isLoading, isPaused } = useQuery({
  queryKey: ["markdown"],
  queryFn: getMarkdowns,
  select: ({ data }) => {
    return data?.map((dataItem: Markdown) => {
      return {
        id: dataItem.id,
        title: dataItem.title,
      };
    });
  },
});

function handleTableSelect(row: Markdown) {
  router.push({
    name: "markdown-id",
    params: {
      id: row.id,
    },
  });
}
</script>

<template>
  <UAlert v-if="isPaused" title="Error" color="red" variant="soft" icon="i-heroicons-exclamation-circle"
    description="We encountered an issue while trying to fetch markdowns. Please try again later. Sorry about that :("
    class="mb-12" />
  <div v-else>
    <UTable @select="handleTableSelect" :columns="columns" :rows="data" :loading="isLoading" :loading-state="{
      icon: 'i-heroicons-arrow-path-20-solid',
      label: 'Hold tight! Loading...',
    }" />
  </div>
</template>
