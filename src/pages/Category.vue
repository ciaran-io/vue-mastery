<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const store = useStore();
const category = computed(() => findById(store.categories, props.id) || {});
const getForumsByCategory = store.getForumsByCategory;

(async function getCategories() {
  const category = await store.fetchCategory({ id: props.id });
  store.fetchForums({ ids: category.forums });
})();
</script>

<template>
  <h1 class="forum-heading">{{ category.name }}</h1>
  <ForumList
    :forums="getForumsByCategory(category.id)"
    :title="category.name"
  >
  </ForumList>
</template>
