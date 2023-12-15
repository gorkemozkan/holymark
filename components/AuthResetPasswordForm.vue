<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const emit = defineEmits(["submit:success"]);

const router = useRouter();
const supabase = useSupabaseClient();
const { isOpen, toggle } = useToggle();

const form = reactive({
  password: "",
  confirmPassword: "",
});

const { mutate, isPending, isSuccess } = useSupabaseForm(() => {
  return supabase.auth.updateUser(form);
});

watch(isSuccess, toggle);
</script>

<template>
  <UForm
    class="auth-form"
    :schema="ResetPasswordSchema"
    :state="form"
    :loading="isPending"
    :validate-on="['submit']"
    @submit="mutate"
  >
    <UFormGroup v-slot="{ error }" label="Password" name="password" size="lg">
      <UInput
        size="xl"
        variant="auth"
        type="password"
        v-model="form.password"
        icon="i-heroicons-key"
        :trailing-icon="error && 'i-heroicons-exclamation-triangle-20-solid'"
      />
    </UFormGroup>
    <UFormGroup v-slot="{ error }" label="Confirm Password" name="password" size="lg">
      <UInput
        size="xl"
        variant="auth"
        type="password"
        v-model="form.confirmPassword"
        icon="i-heroicons-key"
        :trailing-icon="error && 'i-heroicons-exclamation-triangle-20-solid'"
      />
    </UFormGroup>
    <UButton :loading="isPending" type="submit" block size="xl" color="black">
      Reset Password
    </UButton>
  </UForm>
  <Modal
    v-model="isOpen"
    title="Reset Password"
    description="Your password successfully updated. Have a good day!"
    @update:model-value="() => router.push({ name: 'auth-login' })"
  />
</template>
