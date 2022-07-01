<script setup>
import { useStore } from '@/stores/index'

const store = useStore()
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const category = store.getCategoryById(props.id);
const getForumsByCategory = store.getForumsByCategory(category.id)

</script>

<template>
  <h1 class="forum-heading">{{ category.name }}</h1>
  <ForumList
    :forums="getForumsByCategory"
    :title="category.name"
  ></ForumList>
</template>
