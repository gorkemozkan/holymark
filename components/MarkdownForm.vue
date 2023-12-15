<script setup lang="ts">
interface Props {
  loading: boolean;
  buttonText: string;
}

interface Form {
  title: Markdown["title"];
}

defineProps<Props>();

const emit = defineEmits<{
  submit: [data: Form];
}>();

const form = reactive({ title: "" } as Form);

function submitHandler() {
  emit("submit", form);
}
</script>

<template>
  <UForm
    class="space-y-4"
    :validate-on="['submit']"
    :schema="PostSchema"
    :state="form"
    @submit="submitHandler"
  >
    <UFormGroup v-slot="{ error }" name="title" label="Markdown Title" required hint="Required">
      <UInput
        type="text"
        variant="auth"
        autofocus
        v-model="form.title"
        icon="i-heroicons-document"
        placeholder="My Awesome Holymark"
        :autocomplete="form.title"
        :trailing-icon="error && 'i-heroicons-exclamation-triangle-20-solid'"
      />
    </UFormGroup>
    <UButton block :loading="loading" size="lg" type="submit" color="black">
      {{ buttonText }}
    </UButton>
  </UForm>
</template>
