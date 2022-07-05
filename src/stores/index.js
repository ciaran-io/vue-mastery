import { defineStore, acceptHMRUpdate } from 'pinia';
import sourceData from '@/data/data';
import { findById, updateAndInsert } from '@/helpers/index';
export const useStore = defineStore('main', {
  state: () => ({
    ...sourceData,
    authId: 'ALXhxjwgY9PinwNGHpfai6OWyDu2',
  }),

  getters: {
    // Return user matcing authId
    authUser: (state) => {
      const user = findById(state.users, state.authId);

      if (!user) return null;

      return {
        ...user,
        // authuser.posts
        // authuser.getPosts()
        get posts() {
          return state.posts.filter((post) => post.userId == user.id);
        },
        // authuser.postsCount
        get postCount() {
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
            return thread.contributors.length;
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

    getUserById: (state) => {
      return (userId) => findById(state.users, userId);
    },

    // return all categories
    getAllCategories: (state) => state.categories,

    // return all forums
    getAllForums: (state) => state.forums,
  },

  actions: {
    createPost(post) {
      // create random thread id
      post.id = 'gggg' + Math.random();
      // create userId fro post
      post.userId = this.authId;
      // create published date  for post
      (post.publishedAt = Math.floor(Date.now() / 1000)),
        // push new post to post array
        this.setPost({ post });

      this.appendContributorToThread({
        parentId: post.threadId,
        childId: this.authId,
      });
      this.appendPostToThread({ parentId: post.threadId, childId: post.id });
    },

    async createThread({ title, text, forumId }) {
      try {
        const id = 'gggg' + Math.random();
        // create userId for post
        const userId = this.authId;
        // create published date  for post
        const publishedAt = Math.floor(Date.now() / 1000);
        const thread = {
          forumId,
          title,
          publishedAt,
          userId,
          id,
        };

        this.setThread({ thread });
        this.appendThreadToForum({ parentId: forumId, childId: id });
        this.appendThreadToUser({ parentId: userId, childId: id });
        // create a new post and append text && threadId
        this.createPost({ text, threadId: id });

        // return thread for route navigation
        return findById(this.threads, id);
      } catch (error) {
        console.log(error);
      }
    },

    async updateThread({ title, text, id }) {
      try {
        const thread = findById(this.threads, id);
        const post = findById(this.posts, thread.posts[0]);

        const newThread = { ...thread, title };
        const newPosts = { ...post, text };

        this.setThread({ thread: newThread });
        this.setPost({ post: newPosts });

        return newThread;
      } catch (error) {
        console.log(error);
      }
    },

    appendContributorToThread: makeAppendChildParentAction({
      parent: 'threads',
      child: 'contributors',
    }),

    appendPostToThread: makeAppendChildParentAction({
      parent: 'threads',
      child: 'posts',
    }),

    appendThreadToForum: makeAppendChildParentAction({
      parent: 'forums',
      child: 'threads',
    }),

    appendThreadToUser: makeAppendChildParentAction({
      parent: 'users',
      child: 'threads',
    }),

    // find stores users
    setUser(activeUser) {
      const userIndex = this.users.findIndex(
        (user) => user.id == activeUser.id
      );
      this.users[userIndex] = activeUser;
    },

    // find stores posts matching params and update posts
    setPost({ post }) {
      updateAndInsert(this.posts, post);
    },
    // find stores threads matching params and update posts
    setThread({ thread }) {
      updateAndInsert(this.threads, thread);
    },
  },
});

function makeAppendChildParentAction({ parent, child }) {
  return ({ parentId, childId }) => {
    // NOTE: useStore()[parent] is the same as useStore().parent cant use '.' after variable

    const resource = findById(useStore()[parent], parentId);
    resource[child] = resource[child] || [];
    // check if resource child has id and if not add new id
    if (!resource[child].includes(childId)) {
      resource[child].push(childId);
    }
  };
}

// Add hot module replacement
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}
