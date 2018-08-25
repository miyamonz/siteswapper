<template>
  <div id="app">
    <my-canvas style="z-index: -1"/>
      <input type="number" v-model="number" />
      <p>
      {{number}}
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
  margin-top: 60px;
  z-index: 10;
  color: white;
}
input {
  background: white;
}
</style>
