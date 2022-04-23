<script setup lang="ts">
defineProps<{
  day: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
}>();
</script>

<template>
  <div class="relative h-24 border-r border-b border-black border-opacity-10">
    <button
      type="button"
      :class="[
        'relative w-8 h-8 flex justify-center items-center text-xs 2xl:text-sm focus:outline-none transition-colors',
        {
          'text-gray-600 font-light rounded-full': isCurrentMonth && !isToday,
        },
        {
          'text-gray-400 font-light disabled:cursor-not-allowed':
            !isCurrentMonth,
        },
        {
          'bg-sky-500 text-white font-bold rounded-full': isToday,
        },
      ]"
    >
      {{ day }}
    </button>
  </div>
</template>
