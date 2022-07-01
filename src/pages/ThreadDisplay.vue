<script setup>
import { useStore } from '@/stores/index'

const store = useStore()
const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});

//  Return threads posts that match route params
const threadPosts = store.getPostById(props.id)

//  Return first thread that matches route parameters
const thread = store.getThreadById(props.id);

const addPost = (eventData) => {
  const post = {
    ...eventData.post,
    threadId: props.id,
  };
  // update all posts with new post object
  store.createPost(post, props.id);
};
</script>

<template>
  <div class="mt-32 space-y-16">
    <hr />
    <h1 class="text-center text-3xl text-orange-500 break-words">
      {{ thread.title }} hi worls
      </h1>

     <post-list :posts="threadPosts"></post-list>
    <post-editor @save="addPost"></post-editor> 
  </div>
</template>
