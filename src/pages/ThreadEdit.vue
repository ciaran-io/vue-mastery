<script setup>
import { useRouter } from 'vue-router';
import { useStore } from '@/stores/index';
import { computed } from 'vue';
import ThreadEditor from './ThreadEditor.vue';
import { findById } from '@/helpers/index';

const router = useRouter();
const store = useStore();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const thread = computed(() => findById(store.threads, props.id));

const text = computed(
  () => findById(store.posts, thread.value.posts[0]).text
);

async function save({ title, text }) {
  const thread = await store.updateThread({
    title,
    text,
    id: props.id,
  });
  console.log(title,text);
  router.push({ name: 'ThreadDisplay', params: { id: thread.id } });
}

function cancel() {
  router.push({ name: 'ThreadDisplay', params: { id: props.id } });
  console.log('cancel');
}
</script>

<template>
  <h1 class="forum-title">Editing {{ thread.title }}</h1>
  <thread-editor
    :title="thread.title"
    :text="text"
    @save="save"
    @cancel="cancel"
  ></thread-editor>
</template>
