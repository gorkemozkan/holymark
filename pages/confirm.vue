<script setup lang="ts">
 const user = useSupabaseUser();
const toast= useToast()
watch(
  user,
  () => {
    if (user.value) {
      toast.add({
        title: 'Success',
        description:'Successfully logged in. Enjoy!'
      })
      
      return navigateTo("/dashboard");
    }
  },
  { immediate: true }
); 
</script>
<template>
  <div>Waiting for login...</div>
</template>
