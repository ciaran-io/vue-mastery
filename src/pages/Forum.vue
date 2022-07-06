<script setup>
import { computed } from 'vue'
import { useStore } from '@/stores/index';

const store = useStore();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const forum = store.getForumById(props.id);
const threads = computed(() =>
  forum.threads.map((threadId) => store.getThreadById(threadId))
);

</script>

<template>
  <section class="">
    <h1 class="forum-heading">{{ forum.name }}</h1>

    <div class="mt-4 flex flex-wrap justify-between">
      <h2 class="text-xl text-gray-500">{{ forum.description }}</h2>

      <router-link
        :to="{ name: 'ThreadCreate', params: { forumId: forum.id } }"
        class="rounded-full bg-orange-500 py-2 px-4 text-sm text-white"
      >
        Start a thread
      </router-link>
    </div>

    <thread-list :threads="threads"> </thread-list>
  </section>
</template>
