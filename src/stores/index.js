import { defineStore } from 'pinia';
import sourceData from '@/data/data';
export const useStore = defineStore('main', {
  state: () => ({
    ...sourceData,
  }),

  getters: {
    // return category matching prop.id value
    getCategoryById: (state) => {
      return (propId) =>
        state.categories.find((category) => category.id === propId);
    },

    // return forum matching prop.id value
    getForumById: (state) => {
      return (propId) => state.forums.find((forum) => forum.id === propId);
    },

    // return threads matching prop.id value
    getThreadsById: (state) => {
      return (propId) =>
        state.threads.filter((thread) => thread.forumId === propId);
    },

    // Return a thread matching prop.id value
    getThreadById: (state) => {
      return (propId) => state.threads.find((thread) => thread.id === propId);
    },

    // return posts threadId matching prop.id value
    getPostById: (state) => {
      return (propId) => state.posts.filter((post) => post.threadId === propId);
    },

    // return threads matching category.id value
    getForumsByCategory: (state) => {
      return (categoryId) =>
        state.forums.filter((forum) => forum.categoryId === categoryId);
    },

    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId);
    },

    // return all categories
    getAllCategories: (state) => state.categories,

    // return all forums
    getAllForums: (state) => state.forums,
  },

  actions: {
    createPost(post, threadId) {
      // create random thread id
      post.id = 'gggg' + Math.random();
      // push new post to post array
      this.posts.push(post);
      // find thread matching the props.id
      const thread = this.threads.find((thread) => thread.id === threadId);
      // add new id to thread posts
      thread.posts.push(post.id);
    },
  },
});
