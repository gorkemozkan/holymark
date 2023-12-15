<template>
  <div class="grid lg:grid-cols-2 gap-5 dark:bg-transparent mt-10">
    <SkeletonParagraph v-for="i in 2" :key="i" />
  </div>
</template>
