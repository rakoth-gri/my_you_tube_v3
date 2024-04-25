const debounce = (cb: (...args: unknown[]) => void, delay: number) => {
  let timerID: undefined | number = undefined;

  return (...args: unknown[]): void => {
    clearTimeout(timerID);
    timerID = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

export { debounce };
