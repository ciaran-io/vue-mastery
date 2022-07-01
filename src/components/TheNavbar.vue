<script setup></script>

<template>
  <header class="bg-orange-200 py-3 container mx-auto mt-4 px-4 rounded-md">
    <nav class="">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/images/svg/logo.svg" alt="" />
      </router-link>
    </nav>
  </header>
</template>
