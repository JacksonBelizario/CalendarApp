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

const imageUrl = computed(
  () => `http://openweathermap.org/img/wn/${props.weather.icon}@2x.png`
);
</script>

<template>
  <div class="flex items-center justify-center">
    <div
      class="flex flex-col bg-sky-200 border border-grey-lighter rounded p-4 w-full"
    >
      <div class="font-bold text-xl">{{ city }}</div>
      <div class="text-sm text-gray-500">{{ dateFormatted }}</div>
      <div class="flex flex-row items-center justify-center">
        <div
          class="text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 w-28 h-28"
        >
          <img class="w-28 h-28" :src="imageUrl" :alt="weather.description" />
        </div>
        <div class="font-medium w-28 text-center text-6xl ml-6">
          {{ weather.temp.day }}°
        </div>
        <div class="flex flex-col w-28 items-center">
          <div class="capitalize">{{ weather.description }}</div>
          <div v-if="weather.temp.max" class="flex flex-row mt-1">
            <span class="text-sm mt-0.5">
              <ArrowNarrowUpIcon class="w-4 h-4" />
            </span>
            <span class="text-sm font-light text-gray-500">
              {{ weather.temp.max }}°C
            </span>
          </div>
          <div v-if="weather.temp.min" class="flex flex-row align-center">
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
