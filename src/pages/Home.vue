<script setup>
import { useStore } from '@/stores/index'
const store = useStore()
const categories = store.getAllCategories

</script>

<template>
  <h1 class="forum-heading text-center">Welcome to the Forum</h1>
  <CategoryList :categories="categories" />
</template>
