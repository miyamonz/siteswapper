import { Scene, AxesHelper, Group } from "three";
import { getHeightFromSiteswapNum } from "@/util";
import createGrid from "./createGrid";
import config from "@/config";

export const scene = new Scene();
export const axis = new AxesHelper(100);
export const balls = new Group();
export const grids = new Group();

for (let i = 3; i < 15; i++) {
  const grid = createGrid(i);

  //when config.acceleration is updated, change grid line height
  config.$watch("acceleration", acc => {
    const newHeight = getHeightFromSiteswapNum(i, acc);
    grid.position.y = newHeight;
  });
  grids.add(grid);
}

export default function createScene() {
  scene.add(axis);
  scene.add(balls);
  scene.add(grids);
  return scene;
}
