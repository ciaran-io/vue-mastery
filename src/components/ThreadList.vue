<script setup>
import { useStore } from '@/stores/index';
import { findById } from '@/helpers';
import { computed } from 'vue';
import AppDate from './AppDate.vue';

const props = defineProps({
  threads: {
    type: Array,
    required: true,
  },
});

const store = useStore();

const users = computed(() => store.users);
// const userById = store.getUserById(users.value);
function userById(userId) {
  return findById(users.value, userId) || {};
}

//  Return pluralised word
const threadPostsWord = (thread) => {
  if (thread.posts?.length) {
    return thread.posts.length > 1 ? 'posts' : 'post';
  } else {
    return 'no posts';
  }
};
</script>

<template>
  <section
    class="mt-4"
    aria-label="list of threads"
  >
    <!-- List title -->
    <h3 class="forum-title">Threads</h3>

    <!-- Thread -->
    <ul class="forum" v-if="threads">
      <li
        v-for="thread in props.threads"
        :key="thread.id"
        class="forum-spacing grid md:grid-cols-[2fr,1fr] md:items-center"
      >
        <div>
          <p class="forum-link">
            <router-link
              :to="{ name: 'ThreadDisplay', params: { id: thread.id } }"
            >
              {{ thread.title }}
            </router-link>
          </p>

          <p class="mt-4">
            <router-link to="#">
              By {{ userById(thread.userId).name }}
            </router-link>
            <AppDate
              :timestamp="thread.publishedAt"
              class="mt-1 w-max text-sm md:rounded-md md:bg-gray-200 md:px-4 md:py-1"
            />
          </p>
        </div>

        <!-- thread creator -->
        <div
          class="items-center justify-end gap-x-4 md:flex md:flex-row md:flex-wrap md:justify-between md:gap-x-0"
        >
          <!-- thread count -->
          <div class="min-w-max">
            <!-- {{ thread.posts.length + ' replies' }}  -->
            {{ thread.repliesCount }}
            {{ threadPostsWord(thread) }}
          </div>
          <img
            :src="userById(thread.userId).avatar"
            alt=""
            width="40"
            height="40"
            class="h-10 w-10 rounded-full object-cover"
          />

          <div class="hidden md:block">
            <router-link
              to="#"
              class=""
            >
              <!-- {{ userById(thread.userId).name.split(' ')[0] }} -->
            </router-link>
            <br />
            <AppDate
              :timestamp="thread.publishedAt"
              class="min-w-max"
            />
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
