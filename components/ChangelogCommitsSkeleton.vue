<template>
  <div v-for="i in 6">
    <div class="flex items-center space-x-2 my-12">
      <USkeleton class="h-10 w-10" :ui="{ rounded: 'rounded-full' }" />
      <div class="space-y-1.5">
        <USkeleton class="h-3 w-[600px]" />
        <USkeleton class="h-3 w-[250px]" />
      </div>
    </div>
  </div>
</template>
