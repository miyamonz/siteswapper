import { LineBasicMaterial, Geometry, Line, Vector3 } from "three";

export const setHeightToLine = (line, height) => {
  const { vertices } = line.geometry;
  vertices[0].y = height;
  vertices[1].y = height;
  line.geometry.verticesNeedUpdate = true;
};

const createLine = height => {
  const material = new LineBasicMaterial({ color: 0x0000ff });
  const geometry = new Geometry();
  geometry.vertices.push(new Vector3(-10, 0, 0), new Vector3(10, 0, 0));

  const line = new Line(geometry, material);
  setHeightToLine(line, height);
  return line;
};
export default createLine;
