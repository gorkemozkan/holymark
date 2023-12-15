<script setup lang="ts">
const emit = defineEmits(["submit:success"]);

const router = useRouter();
const supabase = useSupabaseClient();
const { isOpen, toggle } = useToggle();

const form = reactive({
  email: "",
});

const { mutate, isPending, isSuccess } = useSupabaseForm(() => {
  return supabase.auth.resetPasswordForEmail(form.email, {
    redirectTo: `${useRuntimeConfig().public.baseUrl}/auth/reset-password`,
  });
});

watch(isSuccess, toggle);
</script>

<template>
  <UForm
    class="auth-form"
    :state="form"
    :loading="isPending"
    :schema="ForgotPasswordSchema"
    :validate-on="['submit']"
    @submit="mutate"
  >
    <UFormGroup v-slot="{ error }" label="Email" name="email" size="lg">
      <UInput
        size="xl"
        variant="auth"
        v-model="form.email"
        icon="i-heroicons-envelope"
        placeholder="you@example.com"
        :trailing-icon="error && 'i-heroicons-exclamation-triangle-20-solid'"
      />
    </UFormGroup>
    <UButton :loading="isPending" type="submit" block size="xl" color="black">
      Send me reset link
    </UButton>
    <UButton class="mt-6" to="/login" block size="xl" variant="outline" color="black">
      Go Back to Login
    </UButton>
  </UForm>
  <Modal
    v-model="isOpen"
    title="Forgot Password"
    icon="i-heroicons-inbox-arrow-down-solid"
    description="We’ve sent you a recovery email to create a new password."
    @update:model-value="() => router.push({ name: 'auth-login' })"
  />
</template>
