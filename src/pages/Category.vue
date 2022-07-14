<script setup>
import { findById } from '@/helpers';
import { useStore } from '@/stores';
import { computed } from 'vue';

const store = useStore();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const category = computed(() => findById(store.categories, props.id)) || {};

const getForumsByCategory = store.getForumsByCategory();

(async function getcategories() {
  const category = await store.fetchCategory({ id: props.id });
  store.fetchForums({ ids: category.forums });
})();
</script>

<template>
  <h1 class="forum-heading">{{ category.name }}</h1>
  <ForumList
    :forums="getForumsByCategory(category)"
    :title="category.name"
  >
  </ForumList>
</template>
