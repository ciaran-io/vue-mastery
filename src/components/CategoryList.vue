<script setup>
import { useStore } from '@/stores/index'
import ForumList from './ForumList.vue';

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const store= useStore();
const getForumsByCategory = store.getForumsByCategory;
</script>

<template>
  <ForumList
    v-for="category in props.categories"
    :key="category.id"
    :forums="getForumsByCategory(category.id)"
    :title="category.name"
    :category-id="category.id"
  ></ForumList>

</template>
