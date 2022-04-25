import { ref, customRef } from "vue";

export function debounce<A = unknown>(
  fn: (...args: A[]) => void,
  delay = 500,
  immediate = false
) {
  let timeout: NodeJS.Timeout;
  return (...args: A[]) => {
    if (immediate && !timeout) fn(...args);
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function useDebouncedRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValue: any,
  delay = 500,
  immediate = false
) {
  const state = ref(initialValue);
  const debouncedRef = customRef((track, trigger) => ({
    get() {
      track();
      return state.value;
    },
    set: debounce(
      (value) => {
        state.value = value;
        trigger();
      },
      delay,
      immediate
    ),
  }));
  return debouncedRef;
}
