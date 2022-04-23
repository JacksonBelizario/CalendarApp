import { defineStore } from "pinia";
import type { Event } from "@/types";

interface CalendarState {
  events: Event[];
}

export const useCalendarStore = defineStore({
  id: "calendar",
  state: (): CalendarState => ({
    events: [],
  }),
  actions: {
    addEvent(event: Event): void {
      this.events.push(event);
    },
    editEvent(idx: number, event: Event): void {
      this.events.splice(idx, 1, event);
    },
    removeEvent(idx: number): void {
      this.events.splice(idx, 1);
    },
  },
});
