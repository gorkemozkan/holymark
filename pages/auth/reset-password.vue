<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

useSeoMeta({
  description:
    "Reset your password with ease on the Markdown Preview App. Follow the instructions sent to your email to securely update your account password.",
  ogTitle: "Markdown Preview App - Reset Password",
  ogDescription:
    "Reset your password with ease on the Markdown Preview App. Follow the instructions sent to your email to securely update your account password.",
  ogUrl: "/auth/reset-password",
  twitterTitle: "Markdown Preview App - Reset Password",
  twitterDescription:
    "Reset your password with ease on the Markdown Preview App. Follow the instructions sent to your email to securely update your account password.",
  robots: "noindex, nofollow",
});

useHead({
  title: "Reset Password",
  meta: [
    { property: "og:url", content: "https://www.holymark.co/auth/reset-password" },
    { property: "og:image", content: "/og-reset-password.png" },
    { name: "twitter:card", content: "/og-reset-password.png" },
    { name: "twitter:image", content: "/og-reset-password.png" },
  ],
});
</script>

<template>
  <AuthResetPasswordForm />
</template>
