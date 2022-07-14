<script setup>
import { useStore } from '@/stores/index';
import { computed } from 'vue';

defineProps({
  edit: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const store = useStore();
const user = computed(() => store.authUser);
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
      class="mt-8 grid gap-y-12 md:gap-x-8 md:gap-y-0 lg:grid-cols-[1fr,2fr]"
    >
      <!-- user information -->
      <div>
        <user-profile-card
          v-if="!edit"
          :user="user"
        >
        </user-profile-card>
        <user-profile-card-editor
          v-else
          :user="user"
        ></user-profile-card-editor>
      </div>

      <!-- user posts -->
      <section
        aria-label="users posts"
        class="space-y-12"
      >
        <post-list :posts="user.posts"></post-list>
      </section>
    </section>
  </div>
</template>
