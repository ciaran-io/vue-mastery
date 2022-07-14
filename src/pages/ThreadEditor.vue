<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['save', 'cancel']);
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
});

// !! operator turns variable into Boolean
const isExistingThread = computed(() => !!props.title);

const form = ref({ title: props.title, text: props.text });

function save() {
  emit('save', { ...form.value });
}
</script>

<template>
  <form
    @submit.prevent="save"
    class="mt-8"
  >
    <div class="">
      <div class="">
        <label for="thread_title">Thread title</label>
        <input
          v-model="form.title"
          type="text"
          name="thread_title"
        />
      </div>

      <div>
        <label for="thred_text">Thread content</label>

        <textarea
          v-model="form.text"
          type="text"
          name="thread_text"
        ></textarea>
      </div>
    </div>

    <div class="mt-14 grid grid-flow-col items-center gap-x-8">
      <button
        @click="$emit('cancel')"
        class="button-pill button-danger"
      >
        Cancel
      </button>

      <button
        type="submit"
        class="button-pill button-submit"
      >
        {{ isExistingThread ? 'Update' : 'Publish' }}
      </button>
    </div>
  </form>
</template>

<style lang="css" scoped>
form {
  @apply rounded-md p-4 pt-8 shadow;

  > div:not(:last-child) {
    @apply space-y-8;
  }
  > div > div {
    @apply grid;
  }

  label {
    @apply text-sm text-gray-500;
  }

  input,
  textarea {
    @apply rounded-md border-2 py-2 pl-2;
  }

  textarea {
    @apply h-40;
  }
}
</style>
