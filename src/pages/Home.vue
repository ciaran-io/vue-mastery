<script setup>
import { categories } from '@/data/data.json';
</script>

<template>
  <h1 class="text-2xl">Welcome to the Forum</h1>
  
  <CategoryList :categories="categories" />
</template>
