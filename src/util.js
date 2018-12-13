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

export const getHeightFromSiteswapNum = (num, acc = 10 * 2) => {
  const unitTime = 0.25;
  const grabTime = 0.1;
  const duration = unitTime * num - grabTime;
  //accに注意
  //Ball/funcs.jsのaccは式の1/2を含んでいる
  const height = (acc * duration ** 2) / 8;
  return height;
};
