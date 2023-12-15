<template>
  <div class="flex flex-col items-center text-center cursor-default px-4 sm:px-0 relative h-full">
    <LandingHeroGridBackground />
    <h1
      class="dark:text-white font-black lg:font-bold inline-block mb-2 md:mb-4 text-5xl lg:text-6xl"
    >
      Write. Preview. Amaze.
    </h1>
    <h2 class="font-bold lg:font-black tracking-wide text-3xl lg:text-7xl">
      The Markdown Preview App
    </h2>
    <div class="max-w-3xl inline-flex justify-center mt-6">
      <p class="tracking-wide text-base lg:text-lg font-light dark:text-gray-200">
        Writing in Markdown has never been this simple and powerful. Focus on your content while our
        app takes care of the formatting. From headers to lists, we've got your Markdown needs
        covered.
      </p>
    </div>
    <LandingHeroLinks v-if="true" class="mt-8" />
  </div>
</template>
