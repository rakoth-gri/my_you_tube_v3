const debounce = (cb: (...args: string[]) => void, delay: number) => {
  let timerID: undefined | number = undefined;

  return (...args: string[]): void => {
    clearTimeout(timerID);
    timerID = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

export { debounce };
