import emitter from "@/event";
import { WebGLRenderer } from "three";
import config from "@/config";

import { throwBall } from "@/Ball";
import { debounceResize, startAnimationLoop } from "@/util";
import { scene, camera, axis, balls, resizeCamera } from "@/objects";

const renderer = new WebGLRenderer();

const setSameRatioAsDOMToRenderer = () => {
  const container = document.querySelector("#container");
  const { clientWidth: width, clientHeight: height } = container;
  renderer.setPixelRatio(window.devicePixelRatio);
  //高解像度のときに重くなりそう
  renderer.setSize(width, height);

  resizeCamera(width / height, camera);
};

export const init = () => {
  setSameRatioAsDOMToRenderer();
  debounceResize(setSameRatioAsDOMToRenderer);

  container.appendChild(renderer.domElement);

  scene.add(axis);
  scene.add(balls);
  camera.position.set(0, 6, 100);

  startAnimationLoop(animate);
};

function animate(t) {
  emitter.emit("animate", t);

  if (config.nextThrowTime < t) {
    config.elapsed++;
    emitter.emit("unitTime", { time: t });
  }
  renderer.render(scene, camera);
}

emitter.on("unitTime", ({ time }) => {
  throwBall(balls, config.elapsed, config.currentHeight);
});
