<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";

const supabase = useSupabaseClient();

const { isPending, mutate } = useMutation({
  mutationKey: ["delete-user"],
  mutationFn: () => supabase.functions.invoke("delete-user"),
});
</script>

<template>
  <SectionTitle title="Delete Account" subtitle="You will lose all of your data by deleting your account." />
  <UButton disabled :loading="isPending" @click="mutate" color="red" variant="soft" size="lg" icon="i-heroicons-trash">
    Delete Account
  </UButton>
</template>
