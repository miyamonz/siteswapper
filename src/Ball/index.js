import { Vector3 } from "three";
import emitter from "@/event";
import config from "@/config";
import Ball from "./Ball.js";
import { createPath, getBallPosition } from "./funcs.js";

export function throwBall(scene, elapsed, height) {
  const isOdd = height % 2 === 1;
  const isFromLeft = elapsed % 2 !== 0;
  const [from, to] = createPath({ isOdd, isFromLeft });

  const time = height * config.unitTime;
  const ball = new Ball(scene, { from, to, time, getBallPosition });

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
