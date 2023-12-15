<template>
  <div class="grid lg:grid-cols-3 gap-y-4 lg:gap-y-0 lg:gap-x-4">
    <AuthProvider text="Github" provider="github" icon="i-mdi-github" />
    <AuthProvider text="GitLab" provider="gitlab" icon="i-mdi-gitlab" />
    <AuthOtp/>
  </div>
</template>
