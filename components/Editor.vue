<template>
  <NuxtErrorBoundary>
    <EditorToolbar />
    <div class="grid lg:grid-cols-2 gap-y-4 lg:gap-y-0">
      <EditorMarkdown />
      <EditorPreview />
    </div>
    <template #error="{ error }">
      {{ error }}
    </template>
  </NuxtErrorBoundary>
</template>
