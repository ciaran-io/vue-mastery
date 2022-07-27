import { acceptHMRUpdate, defineStore } from 'pinia';
export const useStore = defineStore('main', {
	state: () => ({
		categories: [],
		forums: [],
		threads: [],
		posts: [],
		users: [],
		authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2',
		unsubscribes: [],
	}),
	// es6 object propety shorthan
	getters, // auto imported from ./getters.js
	actions, // auto imported from ./actions.js
});

// Add hot module replacement
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}
