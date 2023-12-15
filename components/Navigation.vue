<template>
  <nav
    class="flex items-center justify-between border-b-[.1px] px-4 py-2 w-full dark:border-gray-900 dark:bg-transparent"
  >
    <div class="flex items-center space-x-3 lg:w-1/3">
      <slot name="prepend" />
    </div>
    <slot />
    <div class="flex items-center justify-end lg:w-1/3">
      <slot name="append" />
    </div>
  </nav>
</template>
