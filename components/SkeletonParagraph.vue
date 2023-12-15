<template>
  <div class="space-y-5">
    <USkeleton class="h-8 w-1/2" />
    <USkeleton class="h-4 w-2/3" />
    <USkeleton v-for="_ in 3" class="h-4 w-2/3" />
    <USkeleton v-for="_ in 5" class="h-4 w-full" />
    <USkeleton v-for="_ in 4" class="h-4 w-1/2" />
    <USkeleton v-for="_ in 4" class="h-4 w-1/3" />
    <USkeleton v-for="_ in 4" class="h-4 w-full" />
  </div>
</template>
