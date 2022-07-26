<script setup>
	const store = useStore();
	const { asyncDataStatus_ready, asyncDataStatus_fectched } = asyncDataStatus();
	const categories = computed(() => store.categories);

	(async function getCategories() {
		const categories = await store.fetchAllCategories();
		const forumIds = categories.map((category) => category.forums).flat();

		await store.fetchForums({ ids: forumIds });
		asyncDataStatus_fectched();
	})();
</script>

<template>
	<h1 class="forum-heading text-center">Welcome to the Forums</h1>
	<CategoryList v-if="asyncDataStatus_ready" :categories="categories" />
</template>
