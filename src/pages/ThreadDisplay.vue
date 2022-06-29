<script setup>
import { computed, ref } from 'vue';
import { threads, posts } from '@/data/data.json';
import PostList from '../components/PostList.vue';

const reactivePosts = ref(posts)
const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});

const addPost = () => {
  const postId = 'gggg' + Math.random();
  const post = {
    id: postId,
    text: newPostText.value,
    publishedAt: Math.floor(Date.now() / 1000),
    threadId: props.id,
    userId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2',
  };
  // update posts and thread
  reactivePosts.value.push(post);
  thread.value.posts.push(postId)
  
  newPostText.value = ''
};

const newPostText = ref('');
//  Return threads that mathc route params
const threadPosts = computed(() =>
  reactivePosts.value.filter((post) => post.threadId === props.id)
);

//  Return threads that match route parameters
const thread = computed(() => threads.find((thread) => thread.id === props.id));
</script>

<template>
  <div class="mt-32 space-y-16">
    <hr />
    <h1 class="text-center text-3xl text-orange-500">{{ thread.title }}</h1>

    <post-list :posts="threadPosts"></post-list>

    <div>
      <form @submit.prevent="addPost()">
        <div>
          <textarea
            v-model="newPostText"
            name=""
            id=""
            rows="10"
            class="w-full rounded-md border border-orange-400 p-2"
          ></textarea>
        </div>
      <div class="mt-4 text-right">
        <button
          type="submit"
          class="rounded-full bg-orange-500 px-5 py-2 text-white"
        >
          Submit post
        </button>
      </div>
      </form>
    </div>
  </div>
</template>
