<script setup>
import { ref,  } from 'vue';
import { useStore } from './stores';

const store = useStore();
const authUser = ref({});

(async function getAuthUser() {
  authUser.value = await store.fetchAuthUser();
})();


</script>

<template>
  <the-navbar :auth-user="authUser"></the-navbar>
  <div class="container mx-auto mt-16 px-4">
    <router-view />
  </div>
</template>
