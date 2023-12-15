<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getReleases } from "~/lib/packages/octokit";

const router = useRouter();

const page = ref(1);

const columns = [
  {
    key: "version",
    label: "Version",
  },
  {
    key: "releasedAt",
    label: "Released At",
  },
];

const { isLoading, data, suspense, isPaused } = useQuery({
  queryKey: ["releases", page],
  queryFn: () => getReleases({ page: 1, per_page: 6 }),
  select: (response) => {
    return response.data.map((dataItem) => {
      return {
        ...dataItem,
        releasedAt: formatDate(dataItem.createdAt),
      };
    });
  },
  staleTime: 60000,
});

onServerPrefetch(async () => {
  await suspense();
});
</script>

<template>
  <div>
    <SectionTitle
      title="Releases"
      subtitle="The most recently releases from holymark repository."
    />
    <UAlert
      v-if="isPaused"
      title="Unable to fetch releases"
      color="red"
      icon="i-heroicons-exclamation-circle"
      variant="soft"
      description="We encountered an issue while attempting to retrieve the releases for holymark. This could be caused by connectivity issues, insufficient permissions, or a temporary server problem."
      class="my-12"
    />
    <div v-else>
      <UTable
        :ui="{ wrapper: 'h-96' }"
        :rows="data"
        :columns="columns"
        :loading="isLoading"
        :loading-state="{
          icon: 'i-heroicons-arrow-path-20-solid',
          label: 'Loading...',
        }"
      >
      </UTable>
      <div class="flex justify-end">
        <UButton
          color="black"
          target="_blank"
          trailing-icon="i-heroicons-arrow-up-right"
          to="https://github.com/gorkemozkan/holymark/releases"
        >
          View All Releases
        </UButton>
      </div>
    </div>
  </div>
</template>
