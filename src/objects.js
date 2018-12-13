import { Scene, OrthographicCamera, AxesHelper, Group } from "three";
export const scene = new Scene();
export const camera = new OrthographicCamera(-10, 10, 10, -10);
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
