// 定义一个防抖函数debounce，它接受两个参数：fn（需要防抖的函数）和delay（延迟时间）。
const debounce = (fn, delay) => {
    // 定义一个变量timer，用于存储setTimeout返回的计时器ID。
    let timer = null;
    // 返回一个新的函数。
    return function () {
        // 保存this指向和参数，因为在setTimeout回调中，this指向可能会改变。
        let context = this;
        let args = arguments;
        // 清除之前设置的计时器，以避免多次执行。
        clearTimeout(timer);
        // 设置一个新的计时器，当计时器到达设定的延迟时间delay后，执行原始函数fn。
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    }
}

// 保存原始的ResizeObserver构造函数。
const _ResizeObserver = window.ResizeObserver;
// 自定义ResizeObserver类，覆盖原始的window.ResizeObserver。
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
    constructor(callback) {
        // 使用debounce函数对callback进行防抖处理，延迟时间为16毫秒。
        callback = debounce(callback, 16);
        // 调用原始的ResizeObserver构造函数，并传递防抖后的回调函数。
        super(callback);
    }
}
/*
解决 ERROR ResizeObserver loop completed with undelivered notifications
* 无论ResizeObserver监听的元素大小何时发生变化，
* 实际的回调函数都会在16毫秒的延迟后执行，从而避免在元素大小快速变化时频繁执行回调，提高性能。
* */
