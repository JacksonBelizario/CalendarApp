<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";
import { subDays, addDays, isSameMonth, isSameDay } from "date-fns";

import { SelectedDate, CalendarDay } from "../types";

import MonthSelector from "../components/MonthSelector.vue";
import YearSelector from "../components/YearSelector.vue";
import WeekdayItem from "../components/WeekdayItem.vue";
import CalendarDayItem from "../components/CalendarDayItem.vue";

const week: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const today = new Date();

const selectedDate = reactive<SelectedDate>({
  month: today.getMonth(),
  year: today.getFullYear(),
});

const showPastMonth = (): void => {
  const pastMonth = selectedDate.month - 1;
  if (pastMonth == -1) {
    selectedDate.year--;
  }
  selectedDate.month = pastMonth > -1 ? pastMonth : 11;
};

const showNextMonth = (): void => {
  const nextMonth = selectedDate.month + 1;
  if (nextMonth == 12) {
    selectedDate.year++;
  }
  selectedDate.month = nextMonth < 12 ? nextMonth : 0;
};

const calendarDays = computed<CalendarDay[]>(() => {
  const firstDay = new Date(selectedDate.year, selectedDate.month);

  const dayOfWeek = firstDay.getDay();

  const initialDate = subDays(firstDay, dayOfWeek);

  let date = new Date(initialDate);
  const days = [];
  for (let i = 0; i < 35; i++) {
    days.push({
      date: date,
      isCurrentMonth: isSameMonth(date, firstDay),
      isToday: isSameDay(date, today),
    });
    date = addDays(date, 1);
  }
  return days;
});
</script>

<template>
  <div>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Calendar</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="static sm:relative w-full bg-white sm:shadow-sm">
            <div class="relative flex flex-wrap sm:flex-nowrap">
              <div class="relative w-full">
                <div
                  class="flex justify-between items-center px-2 py-1.5 border border-black border-opacity-10"
                >
                  <div class="flex-shrink-0">
                    <span class="inline-flex">
                      <button
                        type="button"
                        class="p-1.5 bg-white text-gray-600 transition-colors border border-transparent hover:bg-gray-100 hover:text-gray-900 focus:bg-sky-50 focus:text-gray-900 focus:border-sky-300 focus:ring focus:ring-sky-500 focus:ring-opacity-10 focus:outline-none"
                        @click="showPastMonth"
                      >
                        <ChevronLeftIcon class="w-5 h-5" />
                      </button>
                    </span>
                  </div>
                  <div class="px-1.5 space-x-1.5 flex flex-1">
                    <span class="flex-1 flex rounded-md">
                      <MonthSelector v-model="selectedDate.month" />
                    </span>
                    <span class="flex-1 flex rounded-md">
                      <YearSelector v-model="selectedDate.year" />
                    </span>
                  </div>
                  <div class="flex-shrink-0">
                    <span class="inline-flex rounded-full">
                      <button
                        type="button"
                        class="p-1.5 rounded-full bg-white text-gray-600 transition-colors border border-transparent hover:bg-gray-100 hover:text-gray-900 focus:bg-sky-50 focus:text-gray-900 focus:border-sky-300 focus:ring focus:ring-sky-500 focus:ring-opacity-10 focus:outline-none"
                        @click="showNextMonth"
                      >
                        <ChevronRightIcon class="w-5 h-5" />
                      </button>
                    </span>
                  </div>
                </div>
                <div>
                  <div
                    class="grid grid-cols-7 py-3 border-l border-r border-black border-opacity-10"
                  >
                    <WeekdayItem
                      v-for="weekday in week"
                      :key="weekday"
                      :weekday="weekday"
                    />
                  </div>
                  <div
                    class="grid grid-cols-7 gap-y-0.5 border border-black border-opacity-10"
                  >
                    <CalendarDayItem
                      v-for="(calendarDay, idx) in calendarDays"
                      :key="idx"
                      :date="calendarDay.date"
                      :is-current-month="calendarDay.isCurrentMonth"
                      :is-today="calendarDay.isToday"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
