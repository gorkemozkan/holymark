<script setup >
const route = useRoute();

const routes = {
  "auth-register": {
    title: "Sign Up Now",
    subtitle: "Join us by filling out the form below. It only takes a minute!",
  },
  "auth-login": {
    title: "Welcome back",
    subtitle: "Elevate your writing experience with Holymark, designed for efficiency and clarity.",
  },
  "auth-forgot-password": {
    title: "Forgot Password?",
    subtitle: "We’ll send you a recovery email to create a new password.",
  },
  "auth-reset-password": {
    title: "Reset Your Password",
    subtitle: "To reset your password, please enter the new password.",
  },
};
</script>

<template>
  <SectionTitle v-bind="routes[route.name]" />
  <NuxtPage />
</template>
