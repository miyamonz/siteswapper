<template>
  <canvas class="canvas" ref="canvas"></canvas>
</template>
<script>
import paper from "paper";
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  OrthographicCamera,
  AxesHelper
} from "three";
export default {
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init() {
      this.renderer = new WebGLRenderer({ canvas: this.$refs.canvas });
      console.log(this.renderer);
      const axis = new AxesHelper(100);
      this.scene.add(axis);

      this.camera.position.set(0, 0, 100);
    },
    animate() {
      // requestAnimationFrame( animate );
      this.renderer.render(this.scene, this.camera);
    }
  },
  data() {
    return {
      renderer: null,
      scene: new Scene(),
      camera: new OrthographicCamera(-100, 100, 100, -100)
    };
  }
};
</script>
<style lang="scss" scoped>
.canvas {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
</style>
