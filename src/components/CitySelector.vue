<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import { debounce } from "@/utils";
import WeatherApi from "@/api/weather";
import type { City } from "@/types";

const props = defineProps<{
  modelValue?: City;
  required?: boolean;
  error?: string | null;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: City): void;
}>();

const weatherApi = new WeatherApi();

let cities = ref<City[]>([]);

let selected = ref();

onMounted(() => {
  if (props.modelValue) {
    cities.value.push(props.modelValue);
    selected.value = props.modelValue;
  }
});

watch(selected, (city?: City) => {
  if (city && city.name != props.modelValue?.name) {
    emit("update:modelValue", city);
  }
});

let query = ref("");

let isSearching = ref(false);

watch(query, () => (isSearching.value = true));

watch(
  query,
  debounce(async function (res) {
    try {
      if (!res) {
        return;
      }
      const data = await weatherApi.geocoding(res as string);

      cities.value = data.map((item) => ({
        name: `${item.name}, ${item.state}, ${item.country}`,
        lat: item.lat,
        lon: item.lon,
      }));
    } catch (err) {
      cities.value = [];
      console.log(err);
    } finally {
      isSearching.value = false;
    }
  }, 500)
);
</script>

<template>
  <label class="font-semibold text-gray-600 py-2">
    City <abbr v-if="required" title="required">*</abbr>
  </label>
  <Combobox v-model="selected">
    <div class="relative mt-1">
      <div
        class="relative w-full text-left bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg cursor-default sm:text-sm"
      >
        <ComboboxInput
          class="w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
          placeholder="City, State"
          :displayValue="(city) => (city as City).name"
          @change="query = $event.target.value"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions
          class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <div
            v-if="cities.length === 0 && query !== ''"
            class="cursor-default select-none relative py-2 px-4 text-gray-700"
          >
            {{ isSearching ? "Searching..." : "Nothing found." }}
          </div>

          <ComboboxOption
            v-for="city in cities"
            as="template"
            :key="city.name"
            :value="city"
            v-slot="{ selected, active }"
          >
            <li
              class="cursor-default select-none relative py-2 pl-10 pr-4"
              :class="{
                'text-white bg-sky-400': active,
                'text-gray-900': !active,
              }"
            >
              <span
                class="block truncate"
                :class="{ 'font-medium': selected, 'font-normal': !selected }"
              >
                {{ city.name }}
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3"
                :class="{ 'text-white': active, 'text-sky-400': !active }"
              >
                <CheckIcon class="w-5 h-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
  <p :class="['text-red-500 text-xs', { hidden: !error }]">
    {{ error }}
  </p>
</template>
