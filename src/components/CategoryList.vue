<script setup>
import { useStore } from '@/stores/index'
const store = useStore()
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const getForumsByCategory = store.getForumsByCategory
</script>

<template>
  <ForumList
    v-for="category in props.categories"
    :key="category.id"
    :forums="getForumsByCategory(category.id)"
    :title="category.name"
    :categoryId="category.id"
  ></ForumList>
</template>
