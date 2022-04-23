<script setup lang="ts">
defineProps<{
  date: Date;
  isCurrentMonth?: boolean;
  isToday?: boolean;
}>();
defineEmits<{
  (e: "click", value: Date): void;
}>();
</script>

<template>
  <div class="relative h-24 border-r border-b border-black border-opacity-10">
    <button
      type="button"
      @click="$emit('click', date)"
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
      {{ date.getDate() }}
    </button>
  </div>
</template>
