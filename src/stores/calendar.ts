import { defineStore } from "pinia";
import type { Event } from "@/types";
import { v4 as uuidv4 } from "uuid";

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
      this.events.push({
        ...event,
        id: uuidv4(),
      });
    },
    editEvent(id: string, event: Event): void {
      const idx = this.events.findIndex((event) => event.id === id);
      this.events.splice(idx, 1, {
        ...event,
        id,
      });
    },
    removeEvent(id: string): void {
      const idx = this.events.findIndex((event) => event.id === id);
      this.events.splice(idx, 1);
    },
  },
});
