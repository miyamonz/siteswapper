import { Vector3 } from "three";
import config from "@/config";

const fromX = 0.5;
const toX = fromX * 3;

const getPositionWhileGrab = ({ time, to }) => {
  const center = (to.x + (to.x * fromX) / toX) / 2;
  const radius = (to.x - (to.x * fromX) / toX) / 2;

  const y = -Math.abs(radius) * Math.sin(time * Math.PI);
  const x = center + radius * Math.cos(time * Math.PI);
  return { x, y };
};

export const getBallPosition = ({ from, to, current, time }) => {
  //unitTimeに基づく滞空時間のうち、少しをホールド時間に回す
  //そのほうが見た目がきれいになる
  const grabTime = 0.1;
  const flightTime = time - grabTime;

  const ut = current / flightTime;
  if (current < flightTime) {
    const y = -0.5 * config.acceleration * current * (current - flightTime);
    const x = from.x * (1 - ut) + to.x * ut;
    return { x, y };
  }
  //grab time
  // normalized time when ball caught
  const gt = (current - flightTime) / grabTime;
  return getPositionWhileGrab({ time: gt, to });
};

export const createPath = ({ isOdd, isFromLeft }) => {
  const flip = isFromLeft ? 1 : -1;
  const from = new Vector3(fromX * flip, 0, 0);
  const to = new Vector3(toX * flip * (isOdd ? -1 : 1), 0, 0);
  return [from, to];
};
