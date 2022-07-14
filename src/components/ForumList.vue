<script setup>
const props = defineProps({
  categoryId: {
    type: String,
    required: false,
    default: '',
  },
  forums: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: 'Forums',
  },
});

const forumThreadsWord = (forum) => {
  if (forum.threads?.length) {
    return forum.threads.length > 1 ? 'threads' : 'thread';
  } else {
    return 'no threads';
  }
};
</script>

<template>
  <div class="">
    <h3 class="forum-title mt-8">
      <router-link
        v-if="props.categoryId"
        :to="{ name: 'Category', params: { id: props.categoryId } }"
      >
        {{ title }}
      </router-link>
      <template v-else>{{ title }}</template>
    </h3>

    <ul class="forum">
      <li
        v-for="forum in props.forums"
        :key="forum.id"
        class="forum-spacing grid md:grid-cols-2"
      >
        <div>
          <router-link
            :to="{ name: 'Forum', params: { id: forum.id } }"
            class="forum-link"
            >{{ forum.name }}</router-link
          >
          <p>
            {{ forum.description }}
          </p>
        </div>

        <div>
          <span class="font-semibold">
            {{ forum.threads?.length }}
          </span>
          {{ forumThreadsWord(forum) }}
        </div>
      </li>
    </ul>
  </div>
</template>
