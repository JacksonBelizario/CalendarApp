<script setup lang="ts">
import { reactive, computed, watch, watchEffect } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";
import { InformationCircleIcon } from "@heroicons/vue/outline";
import { format, parse } from "date-fns";
import CustomInput from "@/components/forms/CustomInput.vue";
import CitySelector from "@/components/CitySelector.vue";
import WeatherWidget from "@/components/WeatherWidget.vue";
import { useCalendarStore } from "@/stores/calendar";
import type { Event } from "@/types";
import WeatherApi from "@/api/weather";

const weatherApi = new WeatherApi();

const props = defineProps<{
  isOpen: boolean;
  reminderId?: string | null;
  reminderDate?: Date;
}>();
const emit = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
}>();

const store = useCalendarStore();

const isOpen = computed(() => props.isOpen);

const event = reactive<Event>({
  id: null,
  date: "",
  time: "",
  reminder: "",
  city: undefined,
  color: "blue",
  weather: undefined,
});

watch(isOpen, (open) => {
  if (open) {
    if (props.reminderId) {
      const ev = store.events.find((e) => e.id === props.reminderId);
      if (!ev) {
        return;
      }
      event.id = ev.id;
      event.date = ev.date;
      event.time = ev.time;
      event.reminder = ev.reminder;
      event.city = ev.city;
      event.color = ev.color;
      event.weather = ev.weather;
    } else {
      event.id = null;
      event.date = format(props.reminderDate || new Date(), "yyyy-MM-dd");
      event.time = "";
      event.reminder = "";
      event.city = undefined;
      event.color = "blue";
      event.weather = undefined;
    }
  }
});

watchEffect(async () => {
  if (event.date && event.city) {
    const result = await weatherApi.current(
      event.city.lat,
      event.city.lon,
      parse(event.date, "yyyy-MM-dd", new Date())
    );

    event.weather = result
      ? {
          temp: {
            day: Math.trunc(result.temp.day),
            max: Math.trunc(result.temp.max),
            min: Math.trunc(result.temp.min),
          },
          description: result.weather[0].description,
          icon: result.weather[0].icon,
          humidity: result.humidity,
          wind_speed: result.wind_speed,
          uvi: result.uvi,
        }
      : undefined;
  }
});

const close = (): void => {
  emit("update:isOpen", false);
};

const validateForm = (): boolean => {
  return !!event.date && !!event.time && !!event.reminder;
};

const save = (): void => {
  if (!validateForm()) {
    return;
  }
  if (event.id) {
    store.editEvent(event.id, event);
  } else {
    store.addEvent(event);
  }
  close();
};

const remove = (): void => {
  if (!event.id) {
    return;
  }
  store.removeEvent(event.id);
  close();
};
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="close">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-black/75" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                class="font-semibold text-lg mr-auto leading-6 text-gray-900"
              >
                Reminder
              </DialogTitle>
              <div class="mt-2">
                <div class="form">
                  <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                    <div class="mb-3 space-y-2 w-full text-xs">
                      <CustomInput
                        v-model="event.date"
                        label="Date"
                        type="date"
                        required
                      />
                    </div>
                    <div class="mb-3 space-y-2 w-full text-xs">
                      <CustomInput
                        v-model="event.time"
                        label="Time"
                        type="time"
                        required
                      />
                    </div>
                  </div>
                  <div class="mb-3 space-y-2 w-full text-xs">
                    <CustomInput
                      v-model="event.reminder"
                      label="Reminder"
                      type="text"
                      placeholder="Enter your reminder..."
                      maxlength="30"
                      required
                    />
                  </div>
                  <div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
                    <div class="w-full flex flex-col mb-3">
                      <CitySelector v-model="event.city" />
                    </div>
                    <div class="w-full flex flex-col mb-3">
                      <label class="font-semibold text-gray-600 py-2">
                        Color <abbr title="required">*</abbr>
                      </label>
                      <select
                        v-model="event.color"
                        class="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full"
                      >
                        <option value="blue">Blue</option>
                        <option value="red">Red</option>
                        <option value="orange">Orange</option>
                        <option value="green">Green</option>
                        <option value="purple">Purple</option>
                        <option value="gray">Gray</option>
                      </select>
                      <p class="text-sm text-red-500 hidden mt-3">
                        Please fill out this field.
                      </p>
                    </div>
                  </div>
                  <p class="text-xs text-red-500 text-right my-3">
                    Required fields are marked with an asterisk
                    <abbr title="Required field">*</abbr>
                  </p>
                  <div class="mt-5 space-x-3 flex justify-between">
                    <button
                      class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                      @click="close"
                    >
                      Cancel
                    </button>
                    <button
                      v-if="event.id"
                      class="mb-2 md:mb-0 bg-red-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-500"
                      @click="remove"
                    >
                      Remove
                    </button>
                    <button
                      class="mb-2 md:mb-0 bg-sky-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-sky-500"
                      @click="save"
                    >
                      Save
                    </button>
                  </div>
                  <div v-if="event.city && event.date" class="mt-5">
                    <WeatherWidget
                      v-if="event.weather"
                      :city="event.city.name"
                      :date="event.date"
                      :weather="event.weather"
                    />
                    <div
                      v-else
                      class="p-4 mb-4 bg-blue-100 rounded-lg dark:bg-blue-200"
                      role="alert"
                    >
                      <div class="flex items-center">
                        <InformationCircleIcon
                          class="mr-2 w-5 h-5 text-blue-700 dark:text-blue-800"
                        />
                        <h3
                          class="text-lg font-medium text-blue-700 dark:text-blue-800"
                        >
                          Weather not available
                        </h3>
                      </div>
                      <div
                        class="mt-2 mb-4 text-sm text-blue-700 dark:text-blue-800"
                      >
                        Probably the given date is not available on Weather API
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
