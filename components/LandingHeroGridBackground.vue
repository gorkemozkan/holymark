<template>
  <div class="top-0 h-full absolute hidden overflow-visible rounded-lg lg:block w-full -z-10">
    <div class="absolute -inset-40 -z-30 overflow-hidden rounded-full">
      <div class="hero-grid animate-spin absolute h-full w-full" style="opacity: 0.75"></div>
      <div
        class="absolute h-full w-full rounded-full shadow-white dark:shadow-zinc-950 shadow-[inset_0rem_0_5rem_5rem]"
      ></div>
    </div>
  </div>
</template>
<style scoped>
.hero-grid {
  background-size: 8rem 8rem;
  background-image: linear-gradient(90deg, #8882 1px, transparent 0),
    linear-gradient(180deg, #8882 1px, transparent 0);
  animation: movingbackground 90s linear infinite !important;
}
</style>
