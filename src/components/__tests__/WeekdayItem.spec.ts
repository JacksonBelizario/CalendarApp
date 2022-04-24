import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import WeekdayItem from "@/components/WeekdayItem.vue";

describe("WeekdayItem", () => {
  it("renders properly", () => {
    const wrapper = mount(WeekdayItem, { props: { weekday: "Sun" } });
    expect(wrapper.text()).toContain("Sun");
  });
});
