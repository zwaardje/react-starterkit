function debounceFn(func, wait, immediate) {
    let timeout;
    return (function () {
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(null, args);
            }
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(null, args);
        }
    });
}

export const debounceImmediate = (timeout, fn) => debounceFn(fn, timeout, true);

export const debounce = (timeout, fn) => debounceFn(fn, timeout, false);
