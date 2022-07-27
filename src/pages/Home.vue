<script setup>
	const emit = defineEmits(['ready']);
	const store = useStore();
	const { asyncDataStatus_ready, asyncDataStatus_fetched } =
		useAsyncDataStatus();
	const categories = computed(() => store.categories);

	(async function getCategories() {
		const categories = await store.fetchAllCategories();
		const forumIds = categories.map((category) => category.forums).flat();

		await store.fetchForums({ ids: forumIds });
		asyncDataStatus_fetched();
		//FIXME: (emit ('ready') cannot be used in composables in vue 3
		//  called in several components
		emit('ready');
	})();
</script>

<template>
	<div>
		<h1 class="forum-heading text-center">Welcome to the Forums</h1>
		<CategoryList v-if="asyncDataStatus_ready" :categories="categories" />
	</div>
</template>
