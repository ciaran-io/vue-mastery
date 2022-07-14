<template>
  <div class="grid h-screen place-content-center text-center">
    <div class="rounded-md p-6 shadow-md">
      <h1 class="text-4xl text-orange-400">Looks like your lost friend</h1>
      <router-link
        :to="{ name: 'Home' }"
        class="block pt-4 text-xl"
        >Take me back to threads</router-link
      >
    </div>
  </div>
</template>
