import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default {
  // Update posts
  async updatePost({ text, id }) {
    const post = {
      text,
      edited: {
        at: firebase.firestore.FieldValue.serverTimestamp(),
        by: this.authId,
        moderated: false,
      },
    };
    const postRef = firebase.firestore().collection('posts').doc(id);
    await postRef.update(post);
    const updatedPost = await postRef.get();
    this.setItem({ resource: 'posts', item: updatedPost });
  },

  // Create a new posts from postEditor
  async createPost(post) {
    // create userId fro post
    post.userId = this.authId;
    // create published date  for post
    post.publishedAt = firebase.firestore.FieldValue.serverTimestamp();
    // update firebase thread posts
    const batch = firebase.firestore().batch();
    const postRef = firebase.firestore().collection('posts').doc();
    const threadRef = firebase
      .firestore()
      .collection('threads')
      .doc(post.threadId);
    const userRef = firebase.firestore().collection('users').doc(this.authId);

    batch.set(postRef, post);
    batch.update(threadRef, {
      posts: firebase.firestore.FieldValue.arrayUnion(postRef.id),
      contributors: firebase.firestore.FieldValue.arrayUnion(this.authId),
    });
    batch.update(userRef, {
      postsCount: firebase.firestore.FieldValue.increment(1),
    });
    await batch.commit();
    const newPost = await postRef.get();
    // push new post to post array
    this.setItem({
      resource: 'posts',
      item: { ...newPost.data(), id: newPost.id },
    });
    this.appendPostToThread({ parentId: post.threadId, childId: newPost.id });
    this.appendContributorToThread({
      parentId: post.threadId,
      childId: this.authId,
    });
  },
  // Create new Thread from ThreadCreate
  async createThread({ title, text, forumId }) {
    try {
      // create userId for post
      const userId = this.authId;
      // create published date  for post
      const publishedAt = firebase.firestore.FieldValue.serverTimestamp();
      const threadRef = firebase.firestore().collection('threads').doc();
      const userRef = firebase.firestore().collection('users').doc(userId);
      const forumRef = firebase.firestore().collection('forums').doc(forumId);
      const thread = {
        forumId,
        title,
        publishedAt,
        userId,
        id: threadRef.id,
      };
      const batch = firebase.firestore().batch();
      batch.set(threadRef, thread);
      batch.update(userRef, {
        threads: firebase.firestore.FieldValue.arrayUnion(threadRef.id),
      });
      batch.update(forumRef, {
        threads: firebase.firestore.FieldValue.arrayUnion(threadRef.id),
      });

      await batch.commit();
      const newThread = await threadRef.get();

      this.setItem({
        resource: 'threads',
        item: { ...newThread.data(), id: newThread.id },
      });
      this.appendThreadToForum({ parentId: forumId, childId: threadRef.id });
      this.appendThreadToUser({ parentId: userId, childId: threadRef.id });
      // create a new post and append text && threadId
      await this.createPost({ text, threadId: threadRef.id });
      // return thread for route navigation
      return findById(this.threads, threadRef.id);
    } catch (error) {
      console.log(error);
    }
  },

  // Update thread post and title
  async updateThread({ title, text, id }) {
    try {
      const thread = findById(this.threads, id);
      const post = findById(this.posts, thread.posts[0]);
      let newThread = { ...thread, title };
      let newPost = { ...post, text };
      const threadsRef = firebase.firestore().collection('threads').doc(id);
      const postRef = firebase.firestore().collection('posts').doc(post.id);
      const batch = firebase.firestore().batch();
      batch.update(threadsRef, newThread);
      batch.update(postRef, newPost);
      await batch.commit();

      newThread = await threadsRef.get();
      newPost = await postRef.get();
      this.setItem({ resource: 'threads', item: newThread });
      this.setItem({ resource: 'posts', item: newPost });

      return docToResource(newThread);
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

  fetchAuthUser() {
    // fetch trhead from fb
    return this.fetchItem({ resource: 'users', id: this.authId });
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
          this.setItem({ resource, item });
          resolve(item);
        });
    });
  },
  fetchItems({ ids, resource }) {
    return Promise.all(ids.map((id) => this.fetchItem({ id, resource })));
  },

  setItem({ resource, item }) {
    updateAndInsert(this[resource], docToResource(item));
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
};
function makeAppendChildParentAction({ parent, child }) {
  return ({ parentId, childId }) => {
    // NOTE: store()[parent] is the same as store().parent cant use '.' after variable usestore
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
