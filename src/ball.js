import { Vector3 } from "three";
import { scene } from "@/canvas";
import emitter from "@/event";
import { unitTime } from "@/config";

import { CircleGeometry, MeshBasicMaterial, Mesh } from "three";
export function throwBall({ elapsed, heightNum }) {
  let ball = new Ball();
  ball.setHeight(heightNum);

  const update = time => {
    ball.update(time - elapsed * unitTime);
    if (ball.circle.position.y < 0) {
      ball.remove();
      emitter.off("animate", update);
    }
  };
  emitter.on("animate", update);
}

emitter.on("throwBall", t => throwBall(t));

class Ball {
  constructor() {
    const geometry = new CircleGeometry(0.3, 32);
    const material = new MeshBasicMaterial({ color: 0xffff00 });
    const circle = new Mesh(geometry, material);
    scene.add(circle);
    Object.assign(this, { circle });
  }
  setHeight(height) {
    //到達地点を偶数奇数でわける
    this.acc = height;
    this.height = height;
  }
  update(t) {
    //todo: 重力と全体の高さから係数もとめる
    this.circle.position.y = -2 * this.acc * t * (t - this.height);

    //手の位置と回転運動のrから係数出す
    this.circle.position.x = (5 * t) / this.height;
  }
  remove() {
    scene.remove(this.circle);
  }
}
