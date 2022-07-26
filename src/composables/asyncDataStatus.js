export default function () {
	const asyncDataStatus_ready = ref(false);

	function asyncDataStatus_fectched() {
		asyncDataStatus_ready.value = true;
	}

	return { asyncDataStatus_ready, asyncDataStatus_fectched };
}
