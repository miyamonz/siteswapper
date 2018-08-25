<template>
  <div id="app">
    <my-canvas/>
      <input type="number" v-model="number" style="z-index:2"/>
      {{number}}
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
  computed: {
    number: {
      get: function() {
        return config.siteswapNum;
      },
      set: function(n) {
        console.log(n);
        config.siteswapNum = n;
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style>
#app {
  color: #2c3e50;
  margin-top: 60px;
}
input {
  background: white;
  position: fixed;
  z-index: 10;
}
</style>
