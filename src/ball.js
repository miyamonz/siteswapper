import { Vector3 } from "three";
import { scene } from "@/canvas";
import emitter from "@/event";
import config from "@/config";

import { CircleGeometry, MeshBasicMaterial, Mesh } from "three";

const acc = 10;
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
    const from = new Vector3(1, 0, 0);
    const to = new Vector3(2, 0, 0);
    if (this.offset % 2 === 0) {
      from.x *= -1;
      to.x *= -1;
    }
    if (this.height % 2 === 1) to.x *= -1;
    const flight = this.height * config.unitTime;
    this.position.y = -acc * t * (t - flight);

    const ut = t / flight;
    this.position.x = from.x * (1 - ut) + to.x * ut;

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
    ball.update(time - elapsed * config.unitTime);
    if (ball.circle.position.y < 0) {
      ball.remove();
      emitter.off("animate", update);
    }
  };
  emitter.on("animate", update);
}
