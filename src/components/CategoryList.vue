<script setup>
import { forums } from '@/data/data.json';

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const getFormsByCategory = (category) =>
  forums.filter((forum) => forum.categoryId === category.id);
</script>

<template>
  <ForumList
    v-for="category in props.categories"
    :key="category.id"
    :forums="getFormsByCategory(category)"
    :title="category.name"
    :categoryId="category.id"
  ></ForumList>
</template>
