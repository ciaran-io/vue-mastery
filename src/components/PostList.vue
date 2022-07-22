<script setup>
const props = defineProps({
  posts: {
    type: Array,
    required: true,
  },
});

const store = useStore();
const editing = ref(null);

function handleUpdate(event) {
  store.updatePost(event.post);
  editing.value = null;
}

function toggleEditMode(id) {
  // Change editing value to id
  editing.value ? (editing.value = null) : (editing.value = id);
}
// Return user that postsed in thread
function userById(userId) {
  return store.user(userId);
}
</script>

<template>
  <div
    v-for="post in props.posts"
    :key="post.id"
    class="md:grid md:grid-cols-[1fr,2fr] md:gap-x-4 md:gap-y-6"
  >
    <!-- user & post count -->
    <figure
      v-if="userById(post.userId)"
      class="h-fit max-h-48 rounded-md bg-orange-300 p-2 text-white shadow-md"
    >
      <div class="flex items-center md:gap-x-4">
        <img
          :src="userById(post.userId).avatar"
          :alt="`picture of ${userById(post.userId).name}`"
          height="48"
          width="48"
          class="avatar avatar-post"
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
        <p class="flex justify-between px-2">
          {{ userById(post.userId).postsCount }} Posts

          <span class="block">
            {{ userById(post.userId).threadsCount }} Threads
          </span>
        </p>
      </div>
    </figure>

    <!-- post text -->
    <div class="mt-4 rounded bg-gray-100 px-4 pt-6 pb-2 shadow-md md:mt-0">
      <div :class="{ 'flex justify-between gap-x-12': editing !== post.id }">
        <post-editor
          v-if="editing === post.id"
          :post="post"
          @save="handleUpdate"
        />

        <p
          v-else
          class="word-break"
        >
          {{ post.text }}
        </p>

        <button
          v-if="post.userId === store.authId"
          @click.prevent="toggleEditMode(post.id)"
          href="#"
          class="min-w-max"
          title="Make a change"
        >
          <icon-mdi-pencil />
        </button>
      </div>
      <div class="mt-auto ml-auto w-max pt-8 text-orange-400">
        <div v-if="post.edited?.at">edited</div>
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
