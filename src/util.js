export const debounceResize = fn => {
  let isRunning = false;

  window.addEventListener("resize", e => {
    if (isRunning) return;
    isRunning = true;
    window.requestAnimationFrame(() => {
      fn(e);
      isRunning = false;
    });
  });
};
