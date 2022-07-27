<script setup>
	const emit = defineEmits(['ready']);
	const props = defineProps({
		id: {
			type: String,
			required: true,
		},
	});

	const { asyncDataStatus_ready, asyncDataStatus_fetched } =
		useAsyncDataStatus();
	const store = useStore();
	const category = computed(() => findById(store.categories, props.id) || {});
	const getForumsByCategory = store.getForumsByCategory;

	(async function getCategories() {
		const category = await store.fetchCategory({ id: props.id });
		await store.fetchForums({ ids: category.forums });
		asyncDataStatus_fetched();
		//FIXME: (emit ('ready') cannot be used in composables in vue 3
		//  called in several components
		emit('ready');
	})();
</script>

<template>
	<div v-if="asyncDataStatus_ready">
		<h1 class="forum-heading">{{ category.name }}</h1>
		<ForumList
			:forums="getForumsByCategory(category.id)"
			:title="category.name"
		>
		</ForumList>
	</div>
</template>
