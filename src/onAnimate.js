import emitter from "@/event";
import config from "@/config";
import { balls } from "@/objects/index.js";

import { throwBall } from "@/Ball/index.js";
export default function(t) {
  emitter.emit("animate", t);

  if (config.nextThrowTime < t) {
    config.elapsed++;
    emitter.emit("unitTime", { time: t });
  }
}

emitter.on("unitTime", ({ time }) => {
  throwBall(balls, config.elapsed, config.currentHeight);
});
