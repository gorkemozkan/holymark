<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";

const toast = useToast();
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const form = reactive({
  password1: "",
  password2: "",
});

const { mutate, isPending } = useMutation({
  mutationKey: ["profile-change-password"],
  mutationFn: () => {
    return supabase.auth.updateUser({
      email: user.value?.email,
      password: form.password1,
    });
  },
  onSuccess: () => {
    toast.add({
      title: "Succcess",
      description: "Password changed successfully",
    });
  },
});
</script>

<template>
  <SectionTitle title="Change Password" />
  <UForm class="profile-form" :state="form" :validate-on="['submit']" :schema="ChangePasswordSchema" @submit="mutate">
    <UFormGroup v-slot="{ error }" label="New Password" name="password1">
      <UInput
        variant="auth"
        size="xl"
        v-model="form.password1"
        type="password"
        placeholder="Enter a password min 6 characters in length."
        icon="i-heroicons-key"
        :trailing-icon="error && 'i-heroicons-exclamation-triangle-20-solid'"
      >
      </UInput>
    </UFormGroup>
    <UFormGroup v-slot="{ error }" label="Confirm New Password" name="password2">
      <UInput
        variant="auth"
        size="xl"
        type="password"
        v-model="form.password2"
        placeholder="Re-enter your password."
        icon="i-heroicons-key"
        :trailing-icon="error && 'i-heroicons-exclamation-triangle-20-solid'"
      >
      </UInput>
    </UFormGroup>
    <UButton :loading="isPending" size="lg" type="submit" color="black"> Update Password </UButton>
  </UForm>
</template>
