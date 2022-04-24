import { describe, it, expect, beforeEach } from "vitest";
import { ref } from "vue";
import { setActivePinia, createPinia } from "pinia";
import { format } from "date-fns";

import { useAddReminder } from "@/composables/add-reminder";

describe("Add Reminder", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it("Call saveEvent on a reminder with valid inputs should save", () => {
    const isOpen = ref(false);
    const reminderId = ref("");
    const reminderDate = ref(new Date());

    const { event, saveEvent } = useAddReminder(
      isOpen,
      reminderId,
      reminderDate
    );

    event.date = format(reminderDate.value || new Date(), "yyyy-MM-dd");
    event.time = "07:00";
    event.reminder = "Reminder...";
    event.city = {
      name: "Dourados, MS",
      lat: -22.2206145,
      lon: -54.812208,
    };
    event.color = "blue";

    const result = saveEvent();

    expect(result).toBe(true);
  });

  it("Call saveEvent on a reminder with longer text should not save", () => {
    const isOpen = ref(false);
    const reminderId = ref("");
    const reminderDate = ref(new Date());

    const { event, saveEvent } = useAddReminder(
      isOpen,
      reminderId,
      reminderDate
    );

    event.date = format(reminderDate.value || new Date(), "yyyy-MM-dd");
    event.time = "07:00";
    event.reminder = "This reminder has more than 30 characters...";
    event.city = {
      name: "Dourados, MS",
      lat: -22.2206145,
      lon: -54.812208,
    };
    event.color = "blue";

    const result = saveEvent();

    expect(result).toBe(false);
  });
});
