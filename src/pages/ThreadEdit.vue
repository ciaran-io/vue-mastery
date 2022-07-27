<script setup>
	const emit = defineEmits('ready');
	const props = defineProps({
		id: {
			type: String,
			required: true,
		},
	});

	const store = useStore();
	const router = useRouter();
	const { asyncDataStatus_ready, asyncDataStatus_fetched } =
		useAsyncDataStatus();
	const thread = computed(() => findById(store.threads, props.id));
	const text = computed(() => {
		const post = findById(store.posts, thread.value.posts[0]);
		return post ? post.text : '';
	});

	(async function fetchThread() {
		const thread = await store.fetchThread({ id: props.id });
		await store.fetchPost({ id: thread.posts[0] });
		asyncDataStatus_fetched();
		emit('ready');
	})();

	async function save({ title, text }) {
		await store.updateThread({
			title,
			text,
			id: props.id,
		});
		router.push({ name: 'ThreadDisplay', params: { id: props.id } });
	}

	function cancel() {
		router.push({ name: 'ThreadDisplay', params: { id: props.id } });
	}
</script>

<template>
	<template v-if="asyncDataStatus_ready">
		<h1 class="forum-title">Editing {{ thread.title }}</h1>
		<thread-editor
			:title="thread.title"
			:text="text"
			@save="save"
			@cancel="cancel"
		></thread-editor>
	</template>
</template>
