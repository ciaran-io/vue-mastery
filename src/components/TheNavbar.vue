<script setup>
import { useStore } from '@/stores/index';
const store = useStore();

</script>

<template>
  <header class="container mx-auto mt-4 rounded-md bg-orange-200 py-3 px-4">
    <nav class="grid grid-cols-[1fr,1fr,auto] items-center">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/images/svg/logo.svg" alt="" />
      </router-link>

      <ul class="flex items-baseline gap-x-4 justify-self-end">
        <li class="">
          <router-link :to="{ name: 'Profile' }" class="flex items-center gap-x-2">
            <img
              :src="store.authUser.avatar"
              :alt="`${store.authUser.name} profile picture`"
              height="30"
              width="30"
              class="avatar"
            />

            <div class="text-gray-600">
              {{ store.authUser.name }}
            </div>
          </router-link>
        </li>
      </ul>

      <button aria-label="user dropdown menu" class="ml-4">
        <img
          src="@/assets/images/svg/arrow-down.svg"
          alt="user dropdown menu"
          height="25"
          width="25"
        />
      </button>

    </nav>
  </header>
</template>
