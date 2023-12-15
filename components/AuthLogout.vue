<script setup lang="ts">
 import { useMutation } from "@tanstack/vue-query";

const router = useRouter();
const supabase = useSupabaseClient();

const toast = useToast();

const { mutate, isPending } = useMutation({
  mutationKey: ["logout"],
  mutationFn: () => supabase.auth.signOut({scope:'global'}),
  onError: () => {
    toast.add({
      color: "red",
      title: "Error",
      description: "An error occured while trying to logout.",
    });
  },
  onSuccess: () => {
    router.push("/");
  },
}); 
</script>

<template>
  <UButton
    variant="soft"
    color="red"
    class="dark:text-white"
    block
    size="xs"
    :loading="isPending"
    @click="mutate"
  >
    Logout
  </UButton>
</template>
