<script setup>
const store = useStore();
// Retrieve categories from store
const categories = computed(() => store.categories);

(async function getCategories() {
  const categories = await store.fetchAllCategories();
  const forumIds = categories.map((category) => category.forums).flat();

  store.fetchForums({ ids: forumIds });
})();
</script>

<template>
  <h1 class="forum-heading text-center">Welcome to the Forums</h1>
  <CategoryList :categories="categories" />
</template>
