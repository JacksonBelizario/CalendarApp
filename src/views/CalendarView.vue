<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";

import MonthSelector from "../components/MonthSelector.vue";
import YearSelector from "../components/YearSelector.vue";
import Weekday from "../components/Weekday.vue";
import CalendarDay from "../components/CalendarDay.vue";

const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const calendarDays = [
  { day: "27" },
  { day: "28" },
  { day: "29" },
  { day: "30" },
  { day: "31" },
  { day: "1", isCurrentMonth: true },
  { day: "2", isCurrentMonth: true },
  { day: "3", isCurrentMonth: true },
  { day: "4", isCurrentMonth: true },
  { day: "5", isCurrentMonth: true },
  { day: "6", isCurrentMonth: true },
  { day: "7", isCurrentMonth: true },
  { day: "8", isCurrentMonth: true },
  { day: "9", isCurrentMonth: true },
  { day: "10", isCurrentMonth: true },
  { day: "11", isCurrentMonth: true },
  { day: "12", isCurrentMonth: true },
  { day: "13", isCurrentMonth: true },
  { day: "14", isCurrentMonth: true },
  { day: "15", isCurrentMonth: true },
  { day: "16", isCurrentMonth: true },
  { day: "17", isCurrentMonth: true },
  { day: "18", isCurrentMonth: true },
  { day: "19", isCurrentMonth: true },
  { day: "20", isCurrentMonth: true },
  { day: "21", isCurrentMonth: true },
  { day: "22", isCurrentMonth: true },
  { day: "23", isCurrentMonth: true, isToday: true },
  { day: "24", isCurrentMonth: true },
  { day: "25", isCurrentMonth: true },
  { day: "26", isCurrentMonth: true },
  { day: "27", isCurrentMonth: true },
  { day: "28", isCurrentMonth: true },
  { day: "29", isCurrentMonth: true },
  { day: "30", isCurrentMonth: true },
];
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
                      >
                        <ChevronLeftIcon class="w-5 h-5" />
                      </button>
                    </span>
                  </div>
                  <div class="px-1.5 space-x-1.5 flex flex-1">
                    <span class="flex-1 flex rounded-md">
                      <MonthSelector />
                    </span>
                    <span class="flex-1 flex rounded-md">
                      <YearSelector />
                    </span>
                  </div>
                  <div class="flex-shrink-0">
                    <span class="inline-flex rounded-full">
                      <button
                        type="button"
                        class="p-1.5 rounded-full bg-white text-gray-600 transition-colors border border-transparent hover:bg-gray-100 hover:text-gray-900 focus:bg-sky-50 focus:text-gray-900 focus:border-sky-300 focus:ring focus:ring-sky-500 focus:ring-opacity-10 focus:outline-none"
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
                    <Weekday
                      v-for="weekday in week"
                      :key="weekday"
                      :weekday="weekday"
                    />
                  </div>
                  <div
                    class="grid grid-cols-7 gap-y-0.5 border border-black border-opacity-10"
                  >
                    <CalendarDay
                      v-for="(calendarDay, idx) in calendarDays"
                      :key="idx"
                      :day="calendarDay.day"
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
