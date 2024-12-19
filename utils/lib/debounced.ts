export const debounced = (
  func: (...args: unknown[]) => void,
  millisecond = 300,
) => {
  let timer: ReturnType<typeof setTimeout> | null;

  return function (this: unknown, ...args: unknown[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(this, args);
    }, millisecond);
  };
};
