<script setup>
import { useStore } from '@/stores/index';
import 'firebase/compat/firestore';
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

(async function created() {
  // fetch trhead from fb
  const thread = await store.fetchThread({ id: props.id });
  // fetch user
  store.fetchUser({ id: thread.userId });
  // fetch posts
  const posts = await store.fetchPosts({ ids: thread.posts });
  // fetch user post associated with the posts
  const users = posts.map(post => post.userId)
  // fetch user for each post
  store.fetchUsers({ ids: users })
})();

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
  <div
    v-if="thread"
    class="mt-32 space-y-8"
  >
    <h1 class="break-words text-center text-3xl text-orange-500">
      {{ thread.title }}
    </h1>
    <hr />

    <div class="ml-auto w-max">
      <button
        @click="editThread"
        class="button-pill button-submit"
      >
        Edit thread
      </button>
    </div>

    <div class="flex justify-between text-gray-500">
      <p>
        By {{ thread.author?.name }},
        <app-date :timestamp="thread.publishedAt"></app-date>
      </p>
      <p>
        {{ thread.repliesCount }} replies by
        {{ thread.contributorsCount }} contributors
      </p>
    </div>

    <post-list :posts="threadPosts"></post-list>
    <post-editor @save="addPost"></post-editor>
  </div>
</template>
