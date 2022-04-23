<script setup lang="ts">
defineProps<{
  weekday: string;
}>();
</script>

<template>
  <div
    class="text-gray-500 text-xs 2xl:text-sm tracking-wide font-medium text-center cursor-default"
  >
    <span>{{ weekday }}</span>
  </div>
</template>
