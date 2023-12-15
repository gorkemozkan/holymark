<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const form = reactive({
  email: "",
  name: user.value?.user_metadata.name as string,
});

const { mutate, isPending } = useSupabaseForm(() => {
  return supabase.auth.updateUser({
    email: form.email || undefined,
    data: {
      name: form.name,
    },
  });
});

const disableEmailInput = computed(() => {
  const lastUpdate = user.value?.email_confirmed_at as string;
  return dateDiffInDays(new Date(lastUpdate), new Date()) <= 7;
});
</script>

<template>
  <SectionTitle title="Profile Edit" />
  <EmailVerificationAlert class="mb-8" v-if="user?.new_email" />
  <UForm
    class="profile-form"
    :state="form"
    :schema="ProfileEditSchema"
    :loading="isPending"
    :validate-on="['change']"
    @submit="mutate"
  >
    <UFormGroup v-slot="{ error }" label="Name" name="name">
      <UInput
        variant="auth"
        size="xl"
        v-model="form.name"
        placeholder="Enter Your Name"
        icon="i-heroicons-identification"
        :trailing-icon="error && 'i-heroicons-exclamation-triangle-20-solid'"
      />
    </UFormGroup>
    <UFormGroup
      v-slot="{ error }"
      label="Email"
      name="email"
      :hint="disableEmailInput ? 'You can change only one time per week.' : ''"
    >
      <UInput
        :disabled="disableEmailInput"
        variant="auth"
        size="xl"
        v-model="form.email"
        :placeholder="user?.email"
        icon="i-heroicons-envelope"
        :trailing-icon="error && 'i-heroicons-exclamation-triangle-20-solid'"
      />
    </UFormGroup>
    <UButton :loading="isPending" size="lg" type="submit" color="black"> Update User </UButton>
  </UForm>
</template>
