<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

useSeoMeta({
  description:
    "Sign up for the Markdown Preview App, a simple and user-friendly web application that allows developers and content creators to preview Markdown files in real-time. Join today and get started!",
  ogTitle: "Register for the Markdown Preview App - Real-Time Markdown File Preview",
  ogDescription:
    "Join now to visualize how your Markdown content will be rendered before publishing or sharing. Sign up today!",
  ogUrl: "/auth/register",
  twitterTitle: "Register for the Markdown Preview App - Real-Time Markdown File Preview",
  twitterDescription:
    "Join now to visualize how your Markdown content will be rendered before publishing or sharing. Sign up today!",
});

useHead({
  title: "Register",
  link: [{ rel: "canonical", href: "https://www.holymark.co/auth/register" }],
  meta: [
    { property: "og:image", content: "/og-register.png" },
    { name: "twitter:card", content: "/og-register.png" },
    { name: "twitter:image", content: "/og-register.png" },
  ],
});
</script>

<template>
  <KeepAlive>
    <AuthAlternatives />
  </KeepAlive>
  <UDivider class="my-12">or</UDivider>
  <AuthRegisterForm />
</template>
