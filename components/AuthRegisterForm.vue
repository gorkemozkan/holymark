<script setup lang="ts">
const supabase = useSupabaseClient();

const emit = defineEmits(["submit:success"]);

const router = useRouter();
const { isOpen, toggle } = useToggle();

const form = reactive({
  name: "",
  email: "",
  password: "",
});

const {
  public: { baseUrl },
} = useRuntimeConfig();

const { mutate, isPending, isSuccess } = useSupabaseForm(() => {
  return supabase.auth.signUp({
    email: form.email,
    password: form.password,
    options: {
      emailRedirectTo: `${baseUrl}/confirm`,
      data: {
        name: form.name,
      },
    },
  });
});

watch(isSuccess, toggle);
</script>

<template>
  <UForm
    class="auth-form"
    :schema="RegisterSchema"
    :state="form"
    :loading="isPending"
    :validate-on="['submit']"
    @submit="mutate"
  >
    <UFormGroup v-slot="{ error }" label="Name" name="name">
      <UInput
        variant="auth"
        size="xl"
        v-model="form.name"
        placeholder="John"
        icon="i-heroicons-envelope"
        :trailing-icon="error && 'i-heroicons-exclamation-triangle-20-solid'"
      />
    </UFormGroup>
    <UFormGroup v-slot="{ error }" label="Email" name="email">
      <UInput
        variant="auth"
        size="xl"
        v-model="form.email"
        placeholder="you@example.com"
        icon="i-heroicons-envelope"
        :trailing-icon="error && 'i-heroicons-exclamation-triangle-20-solid'"
      />
    </UFormGroup>
    <UFormGroup v-slot="{ error }" label="Password" name="password">
      <UInput
        variant="auth"
        size="xl"
        v-model="form.password"
        type="password"
        :autocomplete="form.password"
        placeholder="Type your password"
        icon="i-heroicons-key"
        :trailing-icon="error && 'i-heroicons-exclamation-triangle-20-solid'"
      />
    </UFormGroup>
    <UButton color="black" :loading="isPending" size="xl" block type="submit"> Register </UButton>
    <UButton block size="sm" class="mt-6" variant="link" to="/auth/login"> Sign In Now </UButton>
  </UForm>
  <Modal
    v-model="isOpen"
    title="Register"
    icon="i-heroicons-envelope-solid"
    description="We've sent a confirmation link to finalize your registration. Please click on the link to complete the process"
    @update:model-value="() => router.push({ name: 'auth-login' })"
  />
</template>
