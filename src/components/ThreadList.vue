<script setup>
import { computed } from 'vue';
import { users } from '@/data/data.json';

const props = defineProps({
  threads: {
    type: Array,
    required: true,
  },
});

const userById = (userId) => users.find((post) => post.id === userId);

//  Return pluralised word
const pluralise = computed(() => (word) => {
  return word > 1 || word === 0 ? word + ' replies' : word + ' reply';
});
</script>

<template>
  <section class="mt-8">
    <!-- List title -->
    <h2 class="rounded-bl-2xl bg-orange-500 py-2 pl-2 text-white">Threads</h2>

    <!-- Thread -->
    <div
      v-for="thread in props.threads"
      :key="thread.id"
      class="grid gap-y-8 border-b-2 border-orange-200 py-4 md:grid-cols-[2fr,1fr] md:items-center"
    >
      <div>
        <p class="font-semibold hover:text-orange-500">
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
        class="thread-creator-container flex items-center  md:flex-row md:flex-wrap justify-end gap-x-4 md:gap-x-0 md; md:justify-between  "
      >
        <!-- thread count -->
        <div class="min-w-max">
          <!-- {{ thread.posts.length + ' replies' }}  -->
          {{ pluralise(thread.posts.length) }}
        </div>
        <img
          :src="userById(thread.userId).avatar"
          alt=""
          width="40"
          height="40"
          class="h-10 w-10 rounded-full object-cover"
        />

        <div class="hidden md:block">
          <router-link to="#" class="">
            {{ userById(thread.userId).name.split(' ')[0] }}
          </router-link>
          <br />
          <AppDate
            :timestamp="thread.publishedAt"
            class="min-w-max break-words"
          />
        </div>
      </div>
    </div>
  </section>
</template>


