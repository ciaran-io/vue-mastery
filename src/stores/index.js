import actions from '@/stores/actions';
import getters from '@/stores/getters';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => ({
    categories: [],
    forums: [],
    threads: [],
    posts: [],
    users: [],
    authId: 'ALXhxjwgY9PinwNGHpfai6OWyDu2',
  }),
  getters,
  actions,
});

// Add hot module replacement
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}
