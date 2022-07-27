<script setup>
	defineProps({
		categories: {
			type: Array,
			required: true,
		},
	});

	const store = useStore();
	const getForumsByCategory = store.getForumsByCategory;
</script>

<template>
	<ForumList
		v-for="category in categories"
		:key="category.id"
		:forums="getForumsByCategory(category.id)"
		:title="category.name"
		:category-id="category.id"
	></ForumList>
</template>
