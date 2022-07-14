import { defineStore, acceptHMRUpdate } from 'pinia';
import { findById, updateAndInsert } from '@/helpers/index';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
export const useStore = defineStore('main', {
  state: () => ({
    categories: [],
    forums: [],
    threads: [],
    posts: [],
    users: [],
    authId: 'ALXhxjwgY9PinwNGHpfai6OWyDu2',
  }),

  getters: {
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
  },

  actions: {
    // Create a new posts from postEditor
    createPost(post) {
      // create random thread id
      post.id = 'gggg' + Math.random();
      // create userId fro post
      post.userId = this.authId;
      // create published date  for post
      (post.publishedAt = Math.floor(Date.now() / 1000)),
        // push new post to post array
        this.setItem({ resource: 'posts', item: post });

      this.appendContributorToThread({
        parentId: post.threadId,
        childId: this.authId,
      });
      this.appendPostToThread({ parentId: post.threadId, childId: post.id });
    },

    // Create new Thread from ThreadCreate
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

        this.setItem({ resource: 'threads', item: thread });
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

    // Update thread post and title
    async updateThread({ title, text, id }) {
      try {
        const thread = findById(this.threads, id);
        const post = findById(this.posts, thread.posts[0]);
        const newThread = { ...thread, title };
        const newPost = { ...post, text };

        this.setItem({ resource: 'threads', item: newThread });
        this.setItem({ resource: 'posts', item: newPost });

        return newThread;
      } catch (error) {
        console.log(error);
      }
    },

    updateUser(user) {
      this.setItem({ resource: 'users', item: user });
    },

    // ---------------------------------------
    // Fetch Single Resource
    // ---------------------------------------

    fetchCategory({ id }) {
      // fetch trhead from fb
      return this.fetchItem({ resource: 'categories', id });
    },

    fetchForum({ id }) {
      // fetch trhead from fb
      return this.fetchItem({ resource: 'forums', id });
    },

    fetchThread({ id }) {
      return this.fetchItem({ resource: 'threads', id });
    },

    fetchPost({ id }) {
      // fetch trhead from fb
      return this.fetchItem({ resource: 'posts', id });
    },

    fetchUser({ id }) {
      // fetch trhead from fb
      return this.fetchItem({ resource: 'users', id });
    },

    // ---------------------------------------
    // Fetch All of a Resource
    // ---------------------------------------

    fetchAllCategories() {
      return new Promise((resolve) => {
        firebase
          .firestore()
          .collection('categories')
          .onSnapshot((querySnapshot) => {
            const categories = querySnapshot.docs.map((doc) => {
              const item = { id: doc.id, ...doc.data() };
              this.setItem({ resource: 'categories', item });
              return item;
            });
            resolve(categories);
          });
      });
    },

    // ---------------------------------------
    // Fetch Multiple Resources
    // ---------------------------------------

    // fetch categories from fb
    fetchCategories({ ids }) {
      return this.fetchItems({ resource: 'categories', ids });
    },

    // fetch forums from fb
    fetchForums({ ids }) {
      return this.fetchItems({ resource: 'forums', ids });
    },

    fetchThreads({ ids }) {
      // fetch trhead from fb
      return this.fetchItems({ resource: 'threads', ids });
    },

    fetchPosts({ ids }) {
      // fetch trhead from fb
      return this.fetchItems({ resource: 'posts', ids });
    },

    fetchUsers({ ids }) {
      // fetch trhead from fb
      return this.fetchItems({ resource: 'users', ids });
    },

    fetchItem({ id, resource }) {
      // fetch trhead from fb
      return new Promise((resolve) => {
        firebase
          .firestore()
          .collection(resource)
          .doc(id)
          .onSnapshot((doc) => {
            const item = { ...doc.data(), id: doc.id };
            this.setItem({ resource, id, item });
            resolve(item);
          });
      });
    },

    fetchItems({ ids, resource }) {
      return Promise.all(ids.map((id) => this.fetchItem({ id, resource })));
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

    setItem({ resource, item }) {
      updateAndInsert(this[resource], item);
    },
  },
});

function makeAppendChildParentAction({ parent, child }) {
  return ({ parentId, childId }) => {
    // NOTE: useStore()[parent] is the same as useStore().parent cant use '.' after variable

    const resource = findById(useStore()[parent], parentId);

    if (!resource) {
      console.warn(
        `Appending ${child} ${childId} to ${parent} ${parentId} failed because the parent does not exist`
      );
      return;
    }

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
