<template>
  <div id="app">
    <my-canvas style="z-index: -1"/>
      <span v-if="config.isValid"></span>
      <span v-else>invalid siteswap</span>
      <br>
      siteswap: <input v-model="config.siteswapStr" />
      <br>
      grabity: <input type="number" v-model="config.acceleration" />
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
#app,
#app * {
  font-size: 30px;
}
input {
  background: white;
}
</style>
