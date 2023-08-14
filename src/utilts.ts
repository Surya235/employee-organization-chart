type DebounceFn = <T extends (...args: any[]) => void>(
  func: T,
  delay?: number
) => T;

export const debounce: DebounceFn = (func, delay = 250) => {
  let timerId: number;

  return ((...args: any[]) => {
    const context = this;
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(context, args), delay);
  }) as any;
};
