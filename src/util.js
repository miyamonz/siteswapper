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

//msec
let start = Date.now();
export const startAnimationLoop = fn => {
  requestAnimationFrame(() => startAnimationLoop(fn));
  let t = (Date.now() - start) / 1000;
  fn(t);
};
