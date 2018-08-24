import emitter from "@/emitter";
import { WebGLRenderer, Scene, OrthographicCamera, AxesHelper } from "three";

const camera = new OrthographicCamera(-10, 10, 10, -10);
const renderer = new WebGLRenderer();
export const scene = new Scene();
const axis = new AxesHelper(100);

export const init = () => {
  const container = document.querySelector("#container");
  const { clientWidth: width, clientHeight: height } = container;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  container.appendChild(renderer.domElement);

  scene.add(axis);
  camera.position.set(0, 8, 100);
};

let start = new Date();
export function animate() {
  requestAnimationFrame(animate);
  let t = (new Date() - start) / 1000;
  emitter.emit("animate", t);

  renderer.render(scene, camera);
}
