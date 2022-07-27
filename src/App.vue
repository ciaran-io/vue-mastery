<script setup>
	// import NProgress from 'nprogress';
	import NProgress from 'nprogress';

	const router = useRouter();
	const store = useStore();
	store.fetchAuthUser();
	const showPage = ref(false);

	NProgress.configure({
		speed: 300,
		showSpinner: false,
	});
	function onPageReady() {
		showPage.value = true;
		NProgress.done();
	}
	router.beforeEach(() => {
		showPage.value = false;
		NProgress.start();
	});
</script>

<template>
	<the-navbar />

	<div class="container mx-auto mt-16 px-4">
		<router-view v-show="showPage" @ready="onPageReady" />
		<app-spinner v-show="!showPage"></app-spinner>
	</div>
</template>

<style>
	@import '../node_modules/nprogress/nprogress.css';
	#nprogress .bar {
		background-color: rgb(249 115 22);
	}
</style>
