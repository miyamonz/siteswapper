import { Vector3 } from "three";
import { scene } from "@/canvas";
import emitter from "@/event";
import config from "@/config";

import { CircleGeometry, MeshBasicMaterial, Mesh } from "three";

const acc = 10;

const fromX = 0.5;
const toX = fromX * 3;
class Ball {
  constructor() {
    const geometry = new CircleGeometry(0.3, 32);
    const material = new MeshBasicMaterial({ color: 0xffff00 });
    const circle = new Mesh(geometry, material);
    const position = new Vector3(0, 0, 0);
    scene.add(circle);
    Object.assign(this, { circle, position });
    this.update(0);
  }
  setHeight(height, offset) {
    //到達地点を偶数奇数でわける
    this.height = height;
    this.offset = offset;
  }
  update(t) {
    const from = new Vector3(fromX, 0, 0);
    const to = new Vector3(toX, 0, 0);
    if (this.offset % 2 === 0) {
      from.x *= -1;
      to.x *= -1;
    }
    if (this.height % 2 === 1) to.x *= -1;
    const allTime = this.height * config.unitTime;
    const grabTime = 0.1;
    const flightTime = allTime - grabTime;

    const ut = t / flightTime;
    if (t < flightTime) {
      this.position.y = -acc * t * (t - flightTime);
      this.position.x = from.x * (1 - ut) + to.x * ut;
    } else {
      const gt = (t - flightTime) / grabTime;
      const c = (to.x + (to.x * fromX) / toX) / 2;
      const r = (to.x - (to.x * fromX) / toX) / 2;

      this.position.y = -Math.abs(r) * Math.sin(gt * Math.PI);
      this.position.x = c + r * Math.cos(gt * Math.PI);
    }

    this.circle.position.x = this.position.x;
    this.circle.position.y = this.position.y;
  }
  remove() {
    scene.remove(this.circle);
  }
}

export function throwBall(elapsed, heightNum) {
  let ball = new Ball();
  ball.setHeight(heightNum, elapsed);

  const update = time => {
    const ballTime = time - elapsed * config.unitTime;
    ball.update(ballTime);
    if (ballTime > ball.height * config.unitTime) {
      ball.remove();
      emitter.off("animate", update);
    }
  };
  emitter.on("animate", update);
}
