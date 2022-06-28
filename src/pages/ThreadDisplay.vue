<script setup>
import { computed } from 'vue';

import { threads, posts, users } from '@/data/data.json';

const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});

const userById = (userId) => users.find((post) => post.id === userId);

const postById = (postId) => posts.find((post) => post.id === postId);

const thread = computed(() => threads.find((thread) => thread.id === props.id));
</script>

<template>
  <div class="mt-32 space-y-16">
    <hr />
    <h1 class="text-center text-3xl text-orange-500">{{ thread.title }}</h1>

    <div
      v-for="postId in thread.posts"
      :key="postId"
      class="md:grid md:grid-cols-[1fr,2fr] md:gap-y-6 md:gap-x-4"
    >
      <!-- user & post count -->
      <figure
        class="h-fit max-h-48 rounded-md bg-orange-300 p-2 text-white shadow-md"
      >
        <div class="flex items-center md:gap-x-4">
          <img
            :src="userById(postById(postId).userId).avatar"
            :alt="`picture of ${userById(postById(postId).userId).name}`"
            height="80"
            width="80"
            class="h-12 w-12 rounded-full object-cover md:h-20 md:w-20"
          />
          <div
            class="font-semi w-full font-semibold  text-center text-gray-600 md:text-left"
          >
            {{ userById(postById(postId).userId).name }}
          </div>
        </div>

        <div
          class="mt-6 w-full rounded-2xl bg-gray-100 py-1 px-2 text-center text-gray-700"
        >
          107 posts
        </div>
      </figure>

      <!-- thread text -->
      <div class="mt-4 rounded bg-gray-100 p-6 shadow-md md:mt-0">
        <p class="break-words">
          {{ postById(postId).text }}
        </p>
        <div class="pt-8 text-right">
          Posted on {{ postById(postId).publishedAt }}
        </div>
      </div>
    </div>
  </div>
 
</template>
