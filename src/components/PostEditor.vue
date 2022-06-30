<script setup>
import { ref } from 'vue';

const emit = defineEmits(['save']);

const postText = ref('');

const save = () => {
  const postId = 'gggg' + Math.random();
  const post = {
    id: postId,
    text: postText.value,
    publishedAt: Math.floor(Date.now() / 1000),
    userId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2',
  };
  emit('save', { post });
  postText.value = '';
};
</script>

<template>
  <form @submit.prevent="save()">
    <div>
      <textarea
        v-model="postText"
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
</template>
