<script setup>
import { computed } from 'vue';
import { users } from '@/data/data.json';
const props = defineProps ({
  threads: {
    type: Array,
    required: true,
  }
})

const userById = (userId) => users.find((post) => post.id === userId);


//  Return pluralised word
const pluralise = computed(
  () => (word) => {
   return  word > 1 || word === 0  ? word + ' replies' 
   : word +' reply'
  }
);
</script>

<template>
  <section class="mt-8">
    <!-- List title -->
    <h2 class="rounded-bl-2xl bg-orange-500 py-2 pl-2 text-white">Threads</h2>

    <!-- Thread -->
    <div
      v-for="thread in props.threads"
      :key="thread.id"
      class="grid grid-cols-[1fr,auto] gap-y-8 border-b-2 border-orange-200 py-4 md:grid-cols-[2fr,1fr] md:items-center"
    >
      <div>
        <p class="font-semibold hover:text-orange-500">
          <router-link :to="{name: 'ThreadDisplay', params: {id: thread.id}}">
            {{ thread.title }}
          </router-link>
        </p>

        <p>
          <router-link to="#">
            By {{ userById(thread.userId).name }}
          </router-link>
          {{ thread.publishedAt }}
        </p>
      </div>

      <!-- thread creator -->
      <div
        class="flex flex-col items-end gap-y-4 gap-x-0 text-right md:flex-row md:items-center md:gap-x-12 md:gap-y-0 md:text-left"
      >
        <!-- thread count -->
        <div class="min-w-max">
          <!-- {{ thread.posts.length + ' replies' }}  -->
          {{pluralise(thread.posts.length) }} 
        </div>
        <img
          :src="userById(thread.userId).avatar"
          alt=""
          width="40"
          height="40"
          class="h-10 w-10 rounded-full object-cover"
        />

        <p class="max-w-[20ch]">
          <router-link to="#" class="">
            {{ userById(thread.userId).name.split(' ')[0] }}
          </router-link>
          <br />
          {{ thread.publishedAt }}
        </p>

      </div>
    </div>
  </section>
</template>
