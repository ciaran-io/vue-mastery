<script setup>
import { useStore } from '@/stores/index';
import { computed } from 'vue';
const store = useStore();

const user = store.authUser;

const userPosts = computed(() =>
  store.posts.filter((post) => post.userId == user.id)
);

const userPostCount = computed(() => userPosts.value.length);

const userThreads = computed(() =>
  store.threads.filter((thread) => thread.userId == user.id)
);

const userThreadsCount = computed(() => userThreads.value.length);

</script>

<template>
  <div>
    <section class="space-y-4 text-right">
      <h1 class="text-xl text-orange-400">{{ user.name }} recent activity</h1>
      <p>See only started threads</p>
    </section>
    <hr />

    <section
      aria-label="user information"
      class="mt-8 grid lg:grid-cols-[1fr,2fr] md:gap-x-8"
    >
      <div>
        <figure>
          <img
            :src="user.avatar"
            alt=""
            width="200"
            height="200"
            class="avatar-profile"
          />

          <div class="mt-8 space-y-4 rounded-md p-4 shadow-md">
            <div>Username {{ user.username }}</div>

            <p>Bio {{ user.bio || 'No bio yet' }}</p>

            <div class="flex gap-x-4">
              <div>Posts {{ userPostCount || 'No posts yet' }}</div>
              <div>Threads {{ userThreadsCount || 'No threads yet' }}</div>

            </div>
          </div>
        </figure>

        <button class="mt-4 rounded-full bg-orange-500 px-4 py-2 text-white ml-auto w-max block">
          Edit Profile
        </button>
      </div>

      <section aria-label="users posts" class="space-y-12">
        <post-list :posts="userPosts"></post-list>
      </section>

    </section>
  </div>
</template>
