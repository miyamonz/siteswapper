<template>
  <div id="app">
    <my-canvas style="z-index: -1"/>
      <input v-model="config.siteswapStr" />
      <p>
      {{config.siteswapStr}}
      </p>
  </div>
</template>

<script>
import MyCanvas from "./components/Canvas";
import config from "@/config";

export default {
  name: "App",
  components: {
    MyCanvas
  },
  computed: {},
  data() {
    return { config };
  }
};
</script>

<style>
#app {
  margin-top: 60px;
  z-index: 10;
  color: white;
}
input {
  background: white;
}
</style>
