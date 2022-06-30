<script setup>
import { computed } from 'vue';

import { categories, forums } from '@/data/data.json';
console.log(categories);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const category = computed(() =>
  categories.find((category) => category.id === props.id)
);

const getFormsByCategory = computed(
  () => (category) => forums.filter((forum) => forum.categoryId === category.id)
);
</script>

<template>
  <h1 class="forum-heading">{{ category.name }}</h1>
  <ForumList
    :forums="getFormsByCategory(category)"
    :title="category.name"
  ></ForumList>
</template>
