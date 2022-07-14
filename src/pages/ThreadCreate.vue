<script setup>
import { findById } from '@/helpers/index';
import { useStore } from '@/stores/index';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ThreadEditor from './ThreadEditor.vue';

const router = useRouter();
const store = useStore();
const props = defineProps({
  forumId: {
    type: String,
    required: true,
  },
});


const forum = computed(() => findById(store.forums, props.forumId));

(function fetchForum(){
  store.fetchForum({ id: props.forumId})
})();

async function save({ title, text }) {
  const thread = await store.createThread({
    title,
    text,
    forumId: forum.value.id,
  });
  console.log(thread);
  router.push({ name: 'ThreadDisplay', params: { id: thread.id } });
}

function cancel() {
  router.push({ name: 'Forum', params: { id: forum.value.id } });
}
</script>

<template>
  <template v-if="forum">
    <h1 class="forum-title">Create new thread in {{ forum.name }}</h1>
    <thread-editor
      @save="save"
      @cancel="cancel"
    ></thread-editor>
  </template>
</template>
