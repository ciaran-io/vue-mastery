<script setup>
import { computed, ref } from 'vue';
import { threads, posts } from '@/data/data.json';

const reactivePosts = ref(posts)

const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});

//  Return threads that match route params
const threadPosts = computed(() =>
  reactivePosts.value.filter((post) => post.threadId === props.id)
);

//  Return first thread that matches route parameters
const thread = computed(() => threads.find((thread) => thread.id === props.id));

const addPost = (eventData) => {
  const post = {
    ...eventData.post,
    threadId: props.id,
  };
  // update all posts with new post object
  reactivePosts.value.push(post);
  // update current thread with new post
  thread.value.posts.push(post.id)
};
</script>

<template>
  <div class="mt-32 space-y-16">
    <hr />
    <h1 class="text-center text-3xl text-orange-500 break-words">{{ thread.title }}</h1>

    <post-list :posts="threadPosts"></post-list>
    <post-editor @save="addPost"></post-editor>
  </div>
</template>
