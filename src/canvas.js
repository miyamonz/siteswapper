import emitter from "@/event";
import { WebGLRenderer, Scene, OrthographicCamera, AxesHelper } from "three";
import config from "@/config";

import { throwBall } from "@/Ball";
import { debounceResize } from "@/util";

const camera = new OrthographicCamera(-10, 10, 10, -10);
const renderer = new WebGLRenderer();
export const scene = new Scene();
const axis = new AxesHelper(100);

const getTopWhenOthersAreSpecific = (aspect, { left, right, bottom }) => {
  const width = right - left;
  const newHeight = width / aspect;
  return bottom + newHeight;
};

const setSameRatioAsDOMToRenderer = () => {
  const container = document.querySelector("#container");
  const { clientWidth: width, clientHeight: height } = container;
  renderer.setPixelRatio(window.devicePixelRatio);
  //高解像度のときに重くなりそう
  renderer.setSize(width, height);

  //set aspect on camera
  //これは左右と加減をfixして計算しているが、
  //理想をいえば入力されたsitesapの最大の高さを収めるように表示すべき
  const aspect = width / height;
  camera.top = getTopWhenOthersAreSpecific(aspect, camera);
  camera.updateProjectionMatrix();
};

export const init = () => {
  setSameRatioAsDOMToRenderer();
  debounceResize(setSameRatioAsDOMToRenderer);

  container.appendChild(renderer.domElement);

  scene.add(axis);
  camera.position.set(0, 6, 100);

  update();
};

let start = new Date();
function update() {
  requestAnimationFrame(update);
  let t = (new Date() - start) / 1000;
  animate(t);
}

function animate(t) {
  emitter.emit("animate", t);

  if (config.nextThrowTime < t) {
    config.elapsed++;

    throwBall(scene, config.elapsed, config.currentHeight);
  }

  renderer.render(scene, camera);
}
