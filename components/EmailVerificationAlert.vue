<script setup lang="ts">
const toast = useToast();
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const {
  public: { baseUrl },
} = useRuntimeConfig();

const { mutate, isPending } = useSupabaseForm(async () => {
  return await supabase.auth.resend({
    type: "email_change",
    email: user.value?.email as string,
    options: {
      emailRedirectTo: `${baseUrl}/profile`,
    },
  });
});
</script>

<template>
  <UAlert
    title="Re-send Verification Email"
    variant="solid"
    color="lime"
    icon="i-heroicons-envelope"
    :actions="[
      {
        label: 'Re-send Verification Email',
        variant: 'outline',
        color: 'white',
        icon: 'i-heroicons-paper-airplane',
        loading: isPending,
        size: 'sm',
        click: mutate,
      },
    ]"
  >
    <template #description>
      <span>
        Follow this link to confirm the update of your email from
        <strong> {{ user?.email }}</strong>
        to
        <strong>{{ user?.new_email }}</strong></span
      >
    </template>
  </UAlert>
</template>
