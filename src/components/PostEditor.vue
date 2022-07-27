<script setup>
	const emit = defineEmits(['save']);
	const props = defineProps({
		post: {
			type: Object,
			default: () => ({ text: null }),
		},
	});
	const postCopy = ref({ ...props.post });

	const save = () => {
		emit('save', { post: postCopy.value });
		postCopy.value.text = '';
	};
</script>

<template>
	<form @submit.prevent="save()">
		<div>
			<textarea
				v-model="postCopy.text"
				name=""
				id=""
				rows="10"
				class="w-full rounded-md border border-orange-400 p-2"
			></textarea>
		</div>

		<div class="mt-4 text-right">
			<button type="submit" class="buton button-pill button-primary">
				{{ post.id ? 'Update Post' : 'Submit Post' }}
			</button>
		</div>
	</form>
</template>
