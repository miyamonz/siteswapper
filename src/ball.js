import { scene } from "@/canvas";
import emitter from "@/emitter";

import { CircleGeometry, MeshBasicMaterial, Mesh } from "three";
const geometry = new CircleGeometry(0.3, 32);
const material = new MeshBasicMaterial({ color: 0xffff00 });
export function throwBall() {
  const circle = new Mesh(geometry, material);
  scene.add(circle);
  emitter.on("animate", t => {
    circle.position.y = 10 * Math.sin(t);
  });

  return circle;
}
