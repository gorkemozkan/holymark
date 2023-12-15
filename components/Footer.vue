<template>
  <footer class="bg-transparent absolute bottom-0 w-full">
    <UDivider>
      <AppLogo class="!text-base" />
    </UDivider>
    <div class="flex flex-col items-center space-y-4 justify-center max-w-7xl mx-4 lg:mx-auto py-8">
      <Socials />
      <div class="text-gray-500 text-xs dark:text-stone-400">Copyright © {{ new Date().getFullYear() }}</div>
    </div>
  </footer>
</template>
