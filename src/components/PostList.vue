<script setup>
import { users } from '@/data/data.json';
const props = defineProps({
  posts: {
    type: Array,
    required: true,
  },
});

// Return user that postsed in thread
const userById = (userId) => users.find((post) => post.id === userId);
</script>

<template>
  <div
    v-for="post in props.posts"
    :key="post.id"
    class="md:grid md:grid-cols-[1fr,2fr] md:gap-y-6 md:gap-x-4"
  >
    <!-- user & post count -->
    <figure
      class="h-fit max-h-48 rounded-md bg-orange-300 p-2 text-white shadow-md"
    >
      <div class="flex items-center md:gap-x-4">
        <img
          :src="userById(post.userId).avatar"
          :alt="`picture of ${userById(post.userId).name}`"
          height="80"
          width="80"
          class="h-12 w-12 rounded-full object-cover md:h-20 md:w-20"
        />
        <div
          class="font-semi w-full text-center font-semibold text-gray-600 md:text-left"
        >
          {{ userById(post.userId).name }}
        </div>
      </div>

      <div
        class="mt-6 w-full rounded-2xl bg-gray-100 py-1 px-2 text-center text-gray-700"
      >
        107 posts
      </div>
    </figure>

    <!-- thread text -->
    <div
      class="mt-4 flex flex-wrap rounded bg-gray-100 px-4 pt-6 pb-2 shadow-md md:mt-0"
    >
      <p class="word-break">
        {{ post.text }}
      </p>

      <div class="mt-auto ml-auto pt-8 text-orange-400">
        <AppDate :timestamp="post.publishedAt" />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.word-break {
  word-break: break-word;
}
</style>
