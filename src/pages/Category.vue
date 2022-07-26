<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const { asyncDataStatus_ready, asyncDataStatus_fectched } = asyncDataStatus();
const store = useStore();
const category = computed(() => findById(store.categories, props.id) || {});
const getForumsByCategory = store.getForumsByCategory;

(async function getCategories() {
  const category = await store.fetchCategory({ id: props.id });
  await store.fetchForums({ ids: category.forums });
  asyncDataStatus_fectched()
})();
</script>

<template>
<div v-if ="asyncDataStatus_ready">
  <h1 class="forum-heading">{{ category.name }}</h1>
  <ForumList
    :forums="getForumsByCategory(category.id)"
    :title="category.name"
  >
  </ForumList>

</div>
</template>
