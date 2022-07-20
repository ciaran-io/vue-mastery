<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const store = useStore();
// clone user object
// eslint-disable-next-line vue/no-setup-props-destructure
const { ...user } = props.user;

function updateUser() {
  store.setItem({ ...user });
  router.push({ name: 'Profile' });
}

function cancelUpdate() {
  router.push({ name: 'Profile' });
}
</script>

<template>
  <img
    :src="user.avatar"
    :alt="`${user.image} profile pictire`"
    class="avatar avatar-profile"
    width="200"
    height="200"
  />
  <form
    @submit.prevent="updateUser"
    class="mt-8"
  >
    <div class="">
      <div>
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          v-model="user.name"
        />
      </div>

      <div>
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          v-model="user.username"
        />
      </div>

      <div>
        <label for="website">Website</label>
        <input
          type="url"
          name="website"
          v-model="user.webiste"
        />
      </div>

      <div>
        <label for="location">Location</label>
        <input
          type="text"
          name="location"
          v-model="user.location"
        />
      </div>

      <div>
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          v-model="user.email"
        />
      </div>

      <div>
        <label for="bio">Bio</label>
        <textarea
          type="text"
          name="bio"
          v-model="user.bio"
        >
        </textarea>
      </div>
    </div>

    <div class="mt-14 grid grid-flow-col items-center gap-x-8">
      <button
        @click="cancelUpdate"
        class="button-pill button-danger"
      >
        Cancel
      </button>

      <button
        type="submit"
        class="button-pill button-submit"
      >
        Save
      </button>
      
    </div>
  </form>
</template>

<!-- <style lang="css" scoped>
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
</style> -->
