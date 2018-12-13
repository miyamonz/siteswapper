import { LineBasicMaterial, Geometry, Line, Vector3 } from "three";
const createLine = height => {
  const material = new LineBasicMaterial({ color: 0x0000ff });
  const geometry = new Geometry();
  geometry.vertices.push(
    new Vector3(-10, height, 0),
    new Vector3(10, height, 0)
  );
  return new Line(geometry, material);
};
export default createLine;
