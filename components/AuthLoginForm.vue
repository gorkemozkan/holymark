<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";

const toast = useToast();
const router = useRouter();
const supabase = useSupabaseClient()


const form = reactive({
  email: "test@email.com",
  password: "deneme123",
});

const { mutate, isPending } = useMutation({
  mutationKey: ["auth-login"],
  mutationFn: async () => {
    const response = await supabase.auth.signInWithPassword(form);

    if (response.error) {
      throw createError(response.error);
    }

    return response;
  },
  onSuccess: () => {
    router.push("/confirm")
  },
  onError: error => {
    toast.add({
      id: "supabase_form_error",
      icon: "i-heroicons-exclamation-circle",
      title: "Error",
      color: "red",
      description: error.message
    });
  },
})


</script>

<template>
  <UForm class="auth-form" :state="form" :loading="isPending" :schema="LoginSchema" :validate-on="['submit']"
    @submit="mutate">
    <UFormGroup v-slot="{ error }" label="Email" name="email">
      <UInput variant="auth" size="xl" v-model="form.email" placeholder="you@example.com" icon="i-heroicons-envelope"
        :trailing-icon="error && 'i-heroicons-exclamation-triangle-20-solid'" />
    </UFormGroup>
    <UFormGroup label="Password" name="password">
      <template #hint>
        <UButton variant="link" to="/auth/forgot-password"> Forgot Password? </UButton>
      </template>
      <template #default="{ error }">
        <UInput variant="auth" size="xl" v-model="form.password" type="password" :autocomplete="form.password"
          placeholder="Type your password" icon="i-heroicons-key"
          :trailing-icon="error && 'i-heroicons-exclamation-triangle-20-solid'" />
      </template>
    </UFormGroup>
    <UButton color="black" :loading="isPending" size="xl" block type="submit"> Login </UButton>
  </UForm>
</template>
