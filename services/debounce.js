const debounce = (cb, delay) => {
    let timerID = null;

    return (...args) => {
        clearTimeout(timerID);
        timerID = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}

export {debounce}