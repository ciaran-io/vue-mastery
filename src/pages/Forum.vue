<script setup>
import { forums, threads } from '@/data/data.json';
import { computed } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const forum = computed(() => forums.find((forum) => forum.id === props.id));

const thread = computed(() =>
  threads.filter((thread) => thread.forumId === props.id)
);
</script>

<template>
  <section class="">
    <h1 class="forum-heading">{{ forum.name }}</h1>

    <div class="mt-4 flex flex-wrap justify-between">
      <h2 class="text-xl text-gray-500">{{ forum.description }}</h2>

      <router-link
        to="#"
        class="rounded-full bg-orange-500 py-2 px-4 text-sm text-white"
      >
        Start a thread
      </router-link>
    </div>

    <thread-list :threads="thread"> </thread-list>
  </section>
</template>
