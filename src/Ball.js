import { CircleGeometry, MeshBasicMaterial, Mesh, Vector3 } from "three";
import emitter from "@/event";
import config from "@/config";

const acc = 10;

const fromX = 0.5;
const toX = fromX * 3;

const createCircleMesh = () => {
  const geometry = new CircleGeometry(0.3, 32);
  const material = new MeshBasicMaterial({ color: 0xffff00 });
  const circle = new Mesh(geometry, material);
  return circle;
};

const getBallPosition = ({ from, to, current, time }) => {
  //unitTimeに基づく滞空時間のうち、少しをホールド時間に回す
  //そのほうが見た目がきれいになる
  const grabTime = 0.1;
  const flightTime = time - grabTime;

  const ut = current / flightTime;
  if (current < flightTime) {
    const y = -acc * current * (current - flightTime);
    const x = from.x * (1 - ut) + to.x * ut;
    return { x, y };
  }
  //grab time
  // normalized time when ball caught
  const gt = (current - flightTime) / grabTime;
  const center = (to.x + (to.x * fromX) / toX) / 2;
  const radius = (to.x - (to.x * fromX) / toX) / 2;

  const y = -Math.abs(radius) * Math.sin(gt * Math.PI);
  const x = center + radius * Math.cos(gt * Math.PI);
  return { x, y };
};

class Ball {
  constructor(scene, { from, to, time }) {
    const position = new Vector3(0, 0, 0);
    const circle = createCircleMesh();
    scene.add(circle);
    Object.assign(this, { circle, position, from, to, time });
    this.update(0);
  }
  update(current) {
    const { from, to, time } = this;
    const { x, y } = getBallPosition({ current, time, from, to });
    Object.assign(this.position, { x, y });
    Object.assign(this.circle.position, { x, y });
  }
  remove() {
    const { parent } = this.circle;
    if (parent) parent.remove(this.circle);
  }
}

const createPath = ({ odd, isFromLeft }) => {
  const flip = isFromLeft ? 1 : -1;
  const from = new Vector3(fromX * flip, 0, 0);
  const to = new Vector3(toX * flip * (odd ? -1 : 1), 0, 0);
  return [from, to];
};
export function throwBall(scene, elapsed, height) {
  const odd = height % 2 === 1;
  const isFromLeft = elapsed % 2 !== 0;
  const [from, to] = createPath({ odd, isFromLeft });
  const time = height * config.unitTime;
  const ball = new Ball(scene, { from, to, time });

  const update = time => {
    const ballTime = time - elapsed * config.unitTime;
    ball.update(ballTime);
    if (ballTime > height * config.unitTime) {
      ball.remove();
      emitter.off("animate", update);
    }
  };
  emitter.on("animate", update);
}
