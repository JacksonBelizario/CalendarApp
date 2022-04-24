import { reactive, watch, watchEffect } from "vue";
import type { Ref } from "vue";
import { format, parse } from "date-fns";
import { useCalendarStore } from "@/stores/calendar";
import type { Event } from "@/types";
import WeatherApi from "@/api/weather";

const weatherApi = new WeatherApi();

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

  const validateForm = (): boolean => {
    return !!event.date && !!event.time && !!event.reminder;
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
    saveEvent,
    removeEvent,
  };
}
