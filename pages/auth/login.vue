<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

useSeoMeta({
  description:
    "Log in to the Markdown Preview App, a simple and user-friendly web application that allows developers and content creators to preview Markdown files in real-time. Access your account and start using our convenient Markdown preview feature.",
  ogTitle: "Log in to the Markdown Preview App - Real-Time Markdown File Preview",
  ogDescription:
    "Access your account to visualize how your Markdown content will be rendered before publishing or sharing. Log in now!",
  ogUrl: "/auth/login",
  twitterTitle: "Log in to the Markdown Preview App - Real-Time Markdown File Preview",
  twitterDescription:
    "Access your account to visualize how your Markdown content will be rendered before publishing or sharing. Log in now!",
});

useHead({
  title: "Log In",
  link: [{ rel: "canonical", href: "https://www.holymark.co/auth/login" }],
  meta: [
    { property: "og:image", content: "/og-login.png" },
    { name: "twitter:card", content: "/og-login.png" },
    { name: "twitter:image", content: "/og-login.png" },
  ],
});
</script>

<template>
  <KeepAlive>
      <AuthAlternatives />
  </KeepAlive>
  <UDivider class="my-10">or</UDivider>
  <AuthLoginForm />
  <UButton class="mt-12" size="lg" block variant="link" to="/auth/register">Sign Up Now </UButton>
</template>
