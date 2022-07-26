<script setup>
	const props = defineProps({
		forumId: {
			type: String,
			required: true,
		},
	});

	const router = useRouter();
	const store = useStore();
	const { asyncDataStatus_ready, asyncDataStatus_fectched } = asyncDataStatus();
	const forum = computed(() => findById(store.forums, props.forumId));

	(async function fetchForum() {
		await store.fetchForum({ id: props.forumId });
		asyncDataStatus_fectched();
	})();

	async function save({ title, text }) {
		const thread = await store.createThread({
			title,
			text,
			forumId: forum.value.id,
		});
		router.push({ name: 'ThreadDisplay', params: { id: thread.id } });
	}

	function cancel() {
		router.push({ name: 'Forum', params: { id: forum.value.id } });
	}
</script>

<template>
	<template v-if="asyncDataStatus_ready">
		<h1 class="forum-title">Create new thread in {{ forum.name }}</h1>
		<thread-editor @save="save" @cancel="cancel"></thread-editor>
	</template>
</template>
