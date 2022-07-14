<script setup>
import { findById } from '@/helpers/index';
import { useStore } from '@/stores';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const thread = computed(() => findById(store.threads, props.id));

const text = computed(() => {
  const post = findById(store.posts, thread.value.posts[0]);
  return post ? post.text : '';
});

(async function fetchThread() {
  const thread = await store.fetchThread({ id: props.id });
  await store.fetchPost({ id: thread.posts[0] });
})();

async function save({ title, text }) {
  const thread = await store.updateThread({
    title,
    text,
    id: props.id,
  });
  router.push({ name: 'ThreadDisplay', params: { id: thread.id } });
}


function cancel() {
  router.push({ name: 'ThreadDisplay', params: { id: props.id } });
}
</script>

<template>
  <template v-if="thread && text">
    <h1 class="forum-title">Editing {{ thread.title }}</h1>
    <thread-editor
      :title="thread.title"
      :text="text"
      @save="save"
      @cancel="cancel"
    ></thread-editor>
  </template>
</template>
