<script setup lang="ts">
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon } from "@heroicons/vue/outline";
import type { Weather } from "@/types";
import { parse } from "date-fns";
import { computed } from "vue";

const props = defineProps<{
  city: string;
  date: string;
  weather: Weather;
}>();

const dateFormatted = computed(() =>
  parse(props.date, "yyyy-MM-dd", new Date()).toDateString()
);
</script>

<template>
  <div class="flex items-center justify-center">
    <div
      class="flex flex-col bg-white border border-grey-lighter rounded p-4 w-full"
    >
      <div class="font-bold text-xl">{{ city }}</div>
      <div class="text-sm text-gray-500">{{ dateFormatted }}</div>
      <div class="flex flex-row items-center justify-center mt-3">
        <div class="font-medium text-6xl">{{ weather.temp.day }}°</div>
        <div class="flex flex-col items-center ml-6">
          <div>{{ weather.description }}</div>
          <div class="flex flex-row mt-1">
            <span class="text-sm mt-0.5">
              <ArrowNarrowUpIcon class="w-4 h-4" />
            </span>
            <span class="text-sm font-light text-gray-500">
              {{ weather.temp.max }}°C
            </span>
          </div>
          <div class="flex flex-row align-center">
            <span class="text-sm mt-0.5">
              <ArrowNarrowDownIcon class="w-4 h-4" />
            </span>
            <span class="text-sm font-light text-gray-500">
              {{ weather.temp.min }}°C
            </span>
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-between mt-3">
        <div class="flex flex-col items-center">
          <div class="font-medium text-sm">Wind</div>
          <div class="text-sm text-gray-500">{{ weather.wind_speed }}m/s</div>
        </div>
        <div class="flex flex-col items-center">
          <div class="font-medium text-sm">Humidity</div>
          <div class="text-sm text-gray-500">{{ weather.humidity }}%</div>
        </div>
        <div class="flex flex-col items-center">
          <div class="font-medium text-sm">UV</div>
          <div class="text-sm text-gray-500">{{ weather.uvi }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
