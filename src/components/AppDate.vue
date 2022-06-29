<script setup>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedDate from 'dayjs/plugin/localizedFormat';
dayjs.extend(relativeTime);
dayjs.extend(localizedDate);

const props = defineProps({
  timestamp: {
    type: Number,
    required: true,
  },
});

// change unix timestamp to relative time
const timeFromNow = () => dayjs.unix(props.timestamp).fromNow();

const humanReadableDate = () => dayjs.unix(props.timestamp).format('llll');
</script>

<template>
  <div :title="humanReadableDate()">
    {{ timeFromNow() }}
  </div>
</template>
