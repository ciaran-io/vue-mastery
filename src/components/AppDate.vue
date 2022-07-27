<script setup>
	import dayjs from 'dayjs';
	import localizedDate from 'dayjs/plugin/localizedFormat';
	import relativeTime from 'dayjs/plugin/relativeTime';
	dayjs.extend(relativeTime);
	dayjs.extend(localizedDate);

	const props = defineProps({
		timestamp: {
			type: [Number, Object],
			default: null,
			required: true,
		},
	});
	const normalizedTimestamp = computed(
		() => props.timestamp?.seconds || props.timestamp
	);
	// change unix timestamp to relative time
	const timeFromNow = computed(() =>
		dayjs.unix(normalizedTimestamp.value).fromNow()
	);

	const humanReadableDate = computed(() =>
		dayjs.unix(normalizedTimestamp.value).format('llll')
	);
</script>

<template>
	<div :title="humanReadableDate">
		{{ timeFromNow }}
	</div>
</template>
