<script setup lang="ts">
import { computed } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

const props = defineProps<{
  modelValue: number;
}>();
defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const years = computed<number[]>(() => {
  const result = [];
  for (let i = props.modelValue + 10; i > props.modelValue - 10; i--) {
    result.push(i);
  }
  return result;
});
</script>

<template>
  <div class="relative w-full">
    <Listbox
      :value="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    >
      <div class="relative mt-1">
        <ListboxButton
          class="border border-gray-300 px-3 py-1.5 block w-full leading-relaxed rounded-md bg-white text-xs 2xl:text-sm tracking-wide text-gray-600 font-semibold sm:font-medium transition-colors border border-transparent hover:bg-gray-100 hover:text-gray-900 focus:bg-sky-50 focus:text-gray-900 focus:border-sky-300 focus:ring focus:ring-sky-500 focus:ring-opacity-10 focus:outline-none uppercase"
        >
          <span class="block truncate text-lg font-semibold">
            {{ modelValue }}
          </span>
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="z-10 absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-for="year in years"
              :key="year"
              :value="year"
              as="template"
            >
              <li
                :class="[
                  year === modelValue
                    ? 'text-sky-900 bg-sky-100'
                    : 'text-gray-900',
                  'cursor-default select-none relative py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    year === modelValue ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >
                  {{ year }}
                </span>
                <span
                  v-if="year === modelValue"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600"
                >
                  <CheckIcon class="w-5 h-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
