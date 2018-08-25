import Vue from "vue";
export default new Vue({
  computed: {
    nextThrowTime() {
      return (this.elapsed + 1) * this.unitTime;
    },
    currentHeight() {
      const nums = this.siteswapNum
        .toString()
        .split("")
        .map(w => parseInt(w, 10));
      const offset = this.elapsed % nums.length;
      return nums[offset];
    }
  },
  data() {
    return {
      elapsed: 0,
      unitTime: 0.25,
      siteswapNum: 7441
    };
  }
});
