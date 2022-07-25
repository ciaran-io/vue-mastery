<script setup>
const store = useStore();
store.fetchAuthUser();
</script>

<template>
  <the-navbar />
  <div class="container mx-auto mt-16 px-4">
    <router-view />
  </div>
</template>
