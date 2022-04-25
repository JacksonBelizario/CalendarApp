import { reactive, ref, computed, watch, watchEffect } from "vue";
import type { Ref } from "vue";
import { format, parse } from "date-fns";
import { useCalendarStore } from "@/stores/calendar";
import type { Event } from "@/types";
import WeatherApi from "@/api/weather";

const weatherApi = new WeatherApi();

interface ReminderErrors {
  date: string | null;
  time: string | null;
  reminder: string | null;
  city: string | null;
  color: string | null;
}

export function useAddReminder(
  isOpen: Ref<boolean>,
  reminderId: Ref<string | null>,
  reminderDate: Ref<Date>
) {
  const store = useCalendarStore();
  const event = reactive<Event>({
    id: null,
    date: "",
    time: "",
    reminder: "",
    city: undefined,
    color: "blue",
    weather: undefined,
  });
  const errors = ref<ReminderErrors>({
    date: null,
    time: null,
    reminder: null,
    city: null,
    color: null,
  });

  watch(isOpen, (open) => {
    if (open) {
      if (reminderId.value) {
        const ev = store.events.find((e) => e.id === reminderId.value);
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
        event.date = format(reminderDate.value || new Date(), "yyyy-MM-dd");
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
      const result = await weatherApi.get(
        event.city.lat,
        event.city.lon,
        parse(event.date, "yyyy-MM-dd", new Date())
      );

      event.weather = result;
    }
  });

  const hasErrors = computed(
    () => Object.values(errors.value).filter((err) => !!err).length > 0
  );

  const resetErrors = () => {
    if (!hasErrors.value) {
      return;
    }
    if (event.date && errors.value.date) {
      errors.value.date = null;
    }
    if (event.time && errors.value.time) {
      errors.value.time = null;
    }
    if (event.reminder && errors.value.reminder) {
      errors.value.reminder = null;
    }
    if (event.city && errors.value.city) {
      errors.value.city = null;
    }
    if (event.color && errors.value.color) {
      errors.value.color = null;
    }
  };

  watch(event, resetErrors);

  const validateForm = (): boolean => {
    if (!event.date) {
      errors.value.date = "Date is required";
    }
    if (!event.time) {
      errors.value.time = "Time is required";
    }
    if (!event.reminder || event.reminder.length > 30) {
      errors.value.reminder = "Enter your reminder";
    }
    if (!event.reminder || event.reminder.length > 30) {
      errors.value.reminder = "Reminder must be smaller than 30 chars";
    }
    if (!event.city) {
      errors.value.city = "City is required";
    }
    if (!event.color) {
      errors.value.color = "Color is required";
    }

    return !hasErrors.value;
  };

  const saveEvent = (): boolean => {
    if (!validateForm()) {
      return false;
    }
    if (event.id) {
      store.editEvent(event.id, event);
    } else {
      store.addEvent(event);
    }

    return true;
  };

  const removeEvent = (): boolean => {
    if (!event.id) {
      return false;
    }
    store.removeEvent(event.id);

    return true;
  };

  return {
    event,
    errors,
    hasErrors,
    saveEvent,
    removeEvent,
  };
}
