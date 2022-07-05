<script setup>
import { useStore } from '@/stores/index';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useStore();
const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});

//  Return threads posts that match route params
const threadPosts = computed(() => store.getPostById(props.id));

//  Return first thread that matches route parameters
const thread = computed(() => store.getThreadById(props.id));

const addPost = (eventData) => {
  const post = {
    ...eventData.post,
    threadId: thread.value.id,
  };
  // update all posts with new post object
  store.createPost(post);
};

function editThread() {
  router.push({ name: 'ThreadEdit', id: props.id });
}
</script>

<template>
  <div class="mt-32 space-y-16">
    <hr />
    <h1 class="break-words text-center text-3xl text-orange-500">
      {{ thread.title }}
    </h1>

    <div class="ml-auto w-max">
      <button @click="editThread" class="button-pill button-submit">
        Edit thread
      </button>
    </div>

    <post-list :posts="threadPosts"></post-list>
    <post-editor @save="addPost"></post-editor>
  </div>
</template>
