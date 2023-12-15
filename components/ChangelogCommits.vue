<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { listCommits } from "~/lib/packages/octokit";

const page = ref(1);

const { data, suspense, isPaused, isLoading } = useQuery({
  queryKey: ["commits", page],
  queryFn: async () => {
    return await listCommits({ page: page.value, per_page: 6 });
  },
  staleTime: 60000, // 1 min,
});

onServerPrefetch(async () => {
  await suspense();
});
</script>

<template>
  <div>
    <SectionTitle title="Commits" subtitle="Latest commits from holymark repository." />
    <UAlert
      v-if="isPaused"
      icon="i-heroicons-exclamation-circle"
      title="Unable to retrieve commits."
      color="red"
      variant="soft"
      description="We encountered an issue while attempting to fetch the commit list for the specified repository. This could be due to network issues, repository access permissions, or a temporary server error."
      class="my-12"
    />
    <ChangelogCommitsSkeleton v-else-if="isLoading" />
    <div v-else>
      <ul>
        <li v-for="(commit, index) in data?.data" :key="index">
          <div class="flex space-x-2 cursor-default" target="_blank">
            <div class="flex flex-col items-center">
              <UAvatar :src="commit.author.avatar_url" alt="Avatar" size="md" />
              <div
                v-if="data && index !== data.data.length - 1"
                class="flex flex-col -space-y-1 text-gray-400 dark:text-gray-700"
              >
                <UIcon name="i-heroicons-ellipsis-vertical" v-for="i in 4" />
              </div>
            </div>
            <div>
              <div class="text-sm tracking-wide">
                {{ commit.commit.message }}
              </div>
              <div class="text-xs text-gray-500">
                {{ commit.commit.author?.name }}
              </div>
            </div>
          </div>
        </li>
      </ul>
      <UButton
        class="mt-8"
        color="black"
        target="_blank"
        trailing-icon="i-heroicons-arrow-up-right"
        to="https://github.com/gorkemozkan/holymark/commits/main"
      >
        View All Commits
      </UButton>
    </div>
  </div>
</template>
