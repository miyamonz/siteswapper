<template>
  <div id="container">
  </div>
</template>
<script>
import paper from "paper";
import { init } from "@/canvas";
import { throwBall } from "@/ball";
export default {
  mounted() {
    init();
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
#container {
  position: fixed;
  left: 0;
  top: 0;
  &,
  & canvas {
    width: 100vw;
    height: 100vh;
  }
}
</style>
