<script setup>
import { findById } from '@/helpers';
import { useStore } from '@/stores';
import { computed } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const store = useStore();

// const forum = store.getForumById(props.id);
const forum = computed(() => findById(store.forums, props.id));


const threads = computed(() => {
  if (!forum.value) return [];

  return forum.value.threads.map((threadId) => store.getThreadById(threadId));
});

(async function getForums() {
  const forum = await store.fetchForum({ id: props.id });
  const threads = await store.fetchThreads({ ids: forum.threads });

  store.fetchUsers({ ids: threads.map((thread) => thread.userId) });
})();
</script>

<template>
  <section class="">
    <div v-if="forum">
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
    </div>

    <thread-list :threads="threads"> </thread-list>
  </section>
</template>
