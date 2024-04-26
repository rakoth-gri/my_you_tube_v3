var debounce = function (cb, delay) {
    var timerID = undefined;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timerID);
        timerID = setTimeout(function () {
            cb.apply(void 0, args);
        }, delay);
    };
};
export { debounce };
