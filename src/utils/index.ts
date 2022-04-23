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
