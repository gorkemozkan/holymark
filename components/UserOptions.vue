<script setup lang="ts">
import type { DropdownItem } from "@nuxt/ui/dist/runtime/types";

const user = useSupabaseUser();

const router = useRouter();

let items: DropdownItem[][] = [];

if (user.value) {
  items = [
    [
      {
        label: "Profile",
        click: () => {
          router.push({ name: "profile" });
        },
      },
    ],
    [
      {
        slot: "home",
        label: "Home",
        click: () => {
          router.push({ name: "index" });
        },
      },
      {
        slot: "dashboard",
        label: "Dashboard",
        click: () => {
          router.push({ name: "dashboard" });
        },
      },
      {
        slot: "changelog",
        label: "Changelog",
        click: () => {
          router.push({ name: "changelog" });
        },
      },
    ],
    [
      {
        slot: "theme",
        label: "Theme",
      },
    ],
    [
      {
        slot: "logout",
        label: "Logout",
      },
    ],
  ];
}
</script>
<template>
  <div v-if="user">
    <UDropdown
      :items="items"
      :ui="{
        item: { disabled: 'cursor-default select-text' },
        background: 'dark:bg-[#111111]',
      }"
      :popper="{ placement: 'bottom-start' }"
    >
      <template #logout>
        <AuthLogout />
      </template>
      <template #theme>
        <div class="flex items-center justify-between w-full text-gray-600 dark:text-gray-200">
          <span class="text-sm">Theme</span>
          <ThemeSwitch toggle />
        </div>
      </template>
      <UTooltip text="Options">
        <UAvatar
          :ui="{
            background: 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400',
            placeholder: 'text-white dark:text-black font-medium text-lg',
          }"
          size="sm"
      /></UTooltip>
    </UDropdown>
  </div>
</template>
