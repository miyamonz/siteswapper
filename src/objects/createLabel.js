import Vue from "vue";
import { CanvasTexture, MeshBasicMaterial, Mesh, PlaneGeometry } from "three";

export default function createLabel(text, size = 12) {
  const canvas = document.createElement("canvas");
  const width = 1000;
  const height = 500;

  Object.assign(canvas, { width, height });
  console.log(canvas.width, canvas.height);
  const context = canvas.getContext("2d", { alpha: true });
  context.clearRect(0, 0, width, height);
  context.font = height + "pt Arial";
  context.textAlign = "center";
  context.fillStyle = "blue";
  context.fillText(text, width / 2, height);

  const texture = new CanvasTexture(canvas);
  const material = new MeshBasicMaterial({ map: texture });

  const aspect = width / height;
  const h = 0.6;
  const w = h * aspect;
  const geometry = new PlaneGeometry(w, h, 10, 10);
  const mesh = new Mesh(geometry, material);

  mesh.position.x = 8;
  mesh.position.y = 0;
  return mesh;
}
