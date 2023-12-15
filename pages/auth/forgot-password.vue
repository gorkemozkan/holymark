<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

useSeoMeta({
  description:
    "Forgot your password? Recover it easily with the Markdown Preview App. Enter your email to receive instructions for password recovery.",
  ogTitle: "Markdown Preview App - Forgot Password",
  ogDescription:
    "Forgot your password? Recover it easily with the Markdown Preview App. Enter your email to receive instructions for password recovery.",
  ogUrl: "/auth/forgot-password",
  twitterTitle: "Markdown Preview App - Forgot Password",
  twitterDescription:
    "Forgot your password? Recover it easily with the Markdown Preview App. Enter your email to receive instructions for password recovery.",
  robots: "noindex, nofollow",
});

useHead({
  title: "Forgot Password",
  meta: [
    { property: "og:url", content: "https://www.holymark.co/forgot-password" },
    { property: "og:image", content: "/og-forgot-password.png" },
    { name: "twitter:card", content: "/og-forgot-password.png" },
    { name: "twitter:image", content: "/og-forgot-password.png" },
  ],
});
</script>

<template>
  <AuthForgotPasswordForm />
</template>
