<template>
  <header>
    <div
      class="flex items-center justify-between xl:max-w-7xl xl:mx-auto mx-4 my-8 lg:my-14 lg:mb-28"
    >
      <AppLogo />
      <div class="hidden lg:flex items-center space-x-4">
        <HeaderLinks />
        <UserOptions />
      </div>
      <AsideExplorer side="left" class="block lg:hidden">
        <template #default>
          <HeaderLinks vertical />
        </template>
        <template #footer>
          <div class="flex justify-between">
            <UserOptions />
            <div></div>
            <ThemeSwitch />
          </div>
        </template>
      </AsideExplorer>
    </div>
  </header>
</template>
