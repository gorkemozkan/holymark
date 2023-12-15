<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";

interface Props {
  provider: "github" | "gitlab";
  icon: string;
  text: string;
}

const props = defineProps<Props>();

const toast = useToast();
const supabase = useSupabaseClient();

const {
  public: { baseUrl },
} = useRuntimeConfig();

const { mutate, isPending } = useMutation({
  mutationKey: ["0Auth", props.provider],
  mutationFn: async () => {
    return await supabase.auth.signInWithOAuth({
      provider: props.provider,
      options: {
        redirectTo: `${baseUrl}/confirm`,
      },
    });
  },
  onSuccess: () => {
    toast.add({
      title: "Success",
      description: "You have successfully logged in. You are being redirected, please wait.",
    });
  },
  onError: () => {
    toast.add({
      color: "red",
      title: "Error",
      description: "We encountered an issue while trying to login with auth provider.",
    });
  },
}); 
</script>

<template>
 <UButton variant="authAlternative" v-bind="$attrs" :loading="isPending" @click="mutate">
    <UIcon :name="icon" />
    <span> {{ text }}</span>
  </UButton> 
</template>
