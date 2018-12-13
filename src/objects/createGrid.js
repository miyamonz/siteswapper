import { LineBasicMaterial, Geometry, Line, Vector3, Group } from "three";

const setHeightToLine = (line, height) => {
  const { vertices } = line.geometry;
  vertices[0].y = height;
  vertices[1].y = height;
  line.geometry.verticesNeedUpdate = true;
};

const createLine = height => {
  const material = new LineBasicMaterial({ color: 0x0000ff });
  const geometry = new Geometry();
  geometry.vertices.push(new Vector3(-10, 0, 0), new Vector3(10, 0, 0));

  return new Line(geometry, material);
};

const createGridLine = height => {
  const group = new Group();
  const line = createLine();
  group.add(line);
  group.position.y = height;
  return group;
};
export default createGridLine;
