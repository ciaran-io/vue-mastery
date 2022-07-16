import { findById } from '@/helpers/index';

export default {
  user: (state) => {
    return (id) => {
      const user = findById(state.users, id);

      if (!user) return null;

      return {
        ...user,
        // authuser.posts
        // authuser.getPosts()
        get posts() {
          return state.posts.filter((post) => post.userId == user.id);
        },
        // authuser.postsCount
        get postsCount() {
          return this.posts.length;
        },
        // authuser.threads
        get threads() {
          return state.threads.filter((post) => post.userId == user.id);
        },
        // authuser.threadsCount
        get threadsCount() {
          return this.threads.length;
        },
      };
    };
  },

  // Return user matcing authId
  authUser(state) {
    return this.user(state.authId);
  },

  // return category matching prop.id value
  getCategoryById: (state) => {
    return (id) => findById(state.categories, id);
  },

  // return forum matching prop.id value
  getForumById: (state) => {
    return (id) => findById(state.forums, id);
  },

  // Return a thread matching prop.id value
  getThreadById: (state) => {
    return (id) => {
      const thread = findById(state.threads, id);
      if (!thread) return {};
      return {
        ...thread,

        get author() {
          return findById(state.users, thread.userId);
        },

        get repliesCount() {
          // first post is content of thread
          return thread.posts.length - 1;
        },

        get contributorsCount() {
          return thread.contributors?.length;
        },
      };
    };
  },

  // return threads matching prop.id value
  getThreadsById: (state) => {
    return (propId) =>
      state.threads.filter((thread) => thread.forumId === propId);
  },

  // return posts threadId matching prop.id value
  getPostById: (state) => {
    return (id) => state.posts.filter((post) => post.threadId === id);
  },

  // return threads matching category.id value
  getForumsByCategory: (state) => {
    return (categoryId) =>
      state.forums.filter((forum) => forum.categoryId === categoryId);
  },

  // return all categories
  getAllCategories: (state) => state.categories,

  // return all forums
  getAllForums: (state) => state.forums,
};
