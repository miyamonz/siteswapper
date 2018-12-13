import { CircleGeometry, MeshBasicMaterial, Mesh, Vector3 } from "three";
const createCircleMesh = () => {
  const geometry = new CircleGeometry(0.3, 32);
  const material = new MeshBasicMaterial({ color: 0xffff00 });
  const circle = new Mesh(geometry, material);
  return circle;
};
class Ball {
  constructor(scene, { from, to, time, getBallPosition }) {
    const position = new Vector3(0, 0, 0);
    const circle = createCircleMesh();
    scene.add(circle);
    Object.assign(this, { circle, position, from, to, time, getBallPosition });
    this.update(0);
  }
  update(current) {
    const { from, to, time } = this;
    const { x, y } = this.getBallPosition({ current, time, from, to });
    Object.assign(this.position, { x, y });
    Object.assign(this.circle.position, { x, y });
  }
  remove() {
    const { parent } = this.circle;
    if (parent) parent.remove(this.circle);
  }
}

export default Ball;
