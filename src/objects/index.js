import { Scene, OrthographicCamera, AxesHelper, Group } from "three";
import { getHeightFromSiteswapNum } from "@/util";
import createLine, { setHeightToLine } from "./createLine";
import config from "@/config";

export const scene = new Scene();
export const camera = new OrthographicCamera(-10, 10, 10, -7);
export const axis = new AxesHelper(100);
export const balls = new Group();

//camera
const getTopWhenOthersAreSpecific = (aspect, { left, right, bottom }) => {
  const width = right - left;
  const newHeight = width / aspect;
  return bottom + newHeight;
};
export const resizeCamera = (aspect, camera) => {
  //set aspect on camera
  //これは左右と加減をfixして計算しているが、
  //理想をいえば入力されたsitesapの最大の高さを収めるように表示すべき
  camera.top = getTopWhenOthersAreSpecific(aspect, camera);
  camera.updateProjectionMatrix();
};

export const grids = new Group();

for (let i = 3; i < 10; i++) {
  const height = getHeightFromSiteswapNum(i, config.acceleration);
  const line = createLine(height);

  //when config.acceleration is updated, change grid line height
  config.$watch("acceleration", acc => {
    const newHeight = getHeightFromSiteswapNum(i, acc);
    setHeightToLine(line, newHeight);
  });
  grids.add(line);
}

export default function createScene() {
  scene.add(axis);
  scene.add(balls);
  scene.add(grids);
  return scene;
}
