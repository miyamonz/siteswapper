import { WebGLRenderer } from "three";
import { debounceResize, startAnimationLoop } from "@/util";
import onAnimate from "./onAnimate";

import createScene, { camera, resizeCamera } from "@/objects/index.js";

const renderer = new WebGLRenderer({ antialias: true, alpha: true });

renderer.setClearColor(0x000000, 0.0);
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

  const scene = createScene();
  camera.position.set(0, 6, 100);

  startAnimationLoop(t => {
    onAnimate(t);
    renderer.render(scene, camera);
  });
};
