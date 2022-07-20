<script setup>
const emit = defineEmits(['save']);
const postText = ref('');

const save = () => {
  const post = {
    text: postText.value,
  };
  emit('save', { post });
  postText.value = '';
};
</script>

<template>
  <form @submit.prevent="save()">
    <div>
      <textarea
        v-model="postText"
        name=""
        id=""
        rows="10"
        class="w-full rounded-md border border-orange-400 p-2"
      ></textarea>
    </div>

    <div class="mt-4 text-right">
      <button type="submit" class="buton button-pill button-primary">
        Submit post
      </button>
    </div>
    
  </form>
</template>
