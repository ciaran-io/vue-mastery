<script setup>
import { threads } from '@/data/data.json'
import ThreadList from '@/components/ThreadList.vue';
</script>

<template>

  <h1 class="text-2xl">Welcome to the Forum</h1>
  <ThreadList :threads='threads'/>
</template>
