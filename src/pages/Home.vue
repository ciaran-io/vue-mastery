<script setup>
import { threads } from '@/data/data.json'
</script>

<template>

  <h1 class="text-2xl">Welcome to the Forum</h1>
  <ThreadList :threads='threads'/>
</template>
