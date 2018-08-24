import emitter from "@/event";
import { WebGLRenderer, Scene, OrthographicCamera, AxesHelper } from "three";
import { unitTime } from "@/config";

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

  update();
};

let lastThrowed = 0;
let start = new Date();
function update() {
  requestAnimationFrame(update);
  let t = (new Date() - start) / 1000;
  animate(t);
}
function animate(t) {
  emitter.emit("animate", t);

  if ((lastThrowed + 1) * unitTime < t) {
    lastThrowed++;
    let heightNum = 1 + Math.floor(Math.random() * 10);
    console.log(heightNum);
    emitter.emit("throwBall", { elapsed: lastThrowed, heightNum });
  }

  renderer.render(scene, camera);
}
