import emitter from "@/event";
import { WebGLRenderer, Scene, OrthographicCamera, AxesHelper } from "three";
import config from "@/config";

import { throwBall } from "@/ball";
import { debounceResize } from "@/util";

const camera = new OrthographicCamera(-10, 10, 10, -10);
const renderer = new WebGLRenderer();
export const scene = new Scene();
const axis = new AxesHelper(100);

const setSameRatioAsDOMToRenderer = () => {
  const container = document.querySelector("#container");
  const { clientWidth: width, clientHeight: height } = container;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
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

    throwBall(config.elapsed, config.currentHeight);
  }

  renderer.render(scene, camera);
}
