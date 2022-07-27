export function useAsyncDataStatus() {
	const asyncDataStatus_ready = ref(false);

	function asyncDataStatus_fetched() {
		asyncDataStatus_ready.value = true;
		//FIXME: (emit ('ready') cannot be used in composables in vue 3
		//  called in several components
	}
	return { asyncDataStatus_ready, asyncDataStatus_fetched };
}
