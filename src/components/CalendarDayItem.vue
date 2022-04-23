<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { format } from "date-fns";
import { useCalendarStore } from "@/stores/calendar";
import type { Event } from "@/types";

const props = defineProps<{
  date: Date;
  isCurrentMonth?: boolean;
  isToday?: boolean;
}>();
defineEmits<{
  (e: "click", value: Date): void;
  (e: "editEvent", id: string): void;
}>();

const store = useCalendarStore();

const dateString = computed<string>(() => format(props.date, "yyyy-MM-dd"));

const events = computed<Event[]>(() =>
  store.events
    .filter((e) => e.date === dateString.value)
    .sort((a, b) => a.time.localeCompare(b.time))
);
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
    <div class="h-16 overflow-y-auto">
      <template v-for="(event, idx) in events" :key="idx">
        <button
          class="px-1 w-full rounded overflow-hidden text-white"
          :class="[
            { 'bg-blue-500': event.color === 'blue' },
            { 'bg-red-500': event.color === 'red' },
            { 'bg-orange-500': event.color === 'orange' },
            { 'bg-green-500': event.color === 'green' },
            { 'bg-purple-500': event.color === 'purple' },
            { 'bg-gray-500': event.color === 'gray' },
          ]"
          @click="$emit('editEvent', event.id)"
        >
          <p class="text-sm truncate leading-tight">{{ event.reminder }}</p>
        </button>
      </template>
    </div>
  </div>
</template>
