export function throttle(fn, ms) {
  let timer = null;

  return function perform() {
    if (timer) return;
    timer = window.setTimeout(() => {
      fn();
      clearTimeout(timer);
      timer = null;
    }, ms);
  };
}
