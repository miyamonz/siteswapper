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
    scene.add(circle);
    Object.assign(this, { circle });
    this.update(0);
  }
  setHeight(height, offset) {
    //到達地点を偶数奇数でわける
    this.height = height;
    this.offset = offset;
  }
  update(t) {
    const flight = this.height * config.unitTime;
    this.circle.position.y = -acc * t * (t - flight);

    const hu = (this.height + this.offset) % 2 ? 1 : -1;
    this.circle.position.x = this.offset % 2 ? 1 : -1 * 0.5 + (hu * t) / flight;
  }
  remove() {
    scene.remove(this.circle);
  }
}

export function throwBall({ elapsed, heightNum }) {
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
