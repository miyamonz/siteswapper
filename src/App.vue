<template>
  <div id="app">
    <my-canvas style="z-index: -1"/>
      <span v-if="config.isValid"></span>
      <span v-else>invalid siteswap</span>
      <br>
      siteswap: <input v-model="config.siteswapStr" />
      <br>
      grabity: <input type="range" v-model="config.acceleration" />
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
  z-index: 10;
}
#app,
#app * {
  font-size: 20px;
}
input {
  background: white;
}

html {
  width: 100%;
  height: 100%;

  /* background: linear-gradient(to bottom, #11e8bb 0%, #8200c9 100%); */
  background: radial-gradient(#eeeeee 0%, #cccccc 100%);
}
</style>
