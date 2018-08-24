<template>
  <div id="app">
    <my-canvas/>
  </div>
</template>

<script>
import MyCanvas from "./components/Canvas";

export default {
  name: "App",
  components: {
    MyCanvas
  }
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
