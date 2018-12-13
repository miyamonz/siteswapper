import Vue from "vue";
import isValid from "@/siteswap";

const siteswapNotationToNumArray = str => {
  return str.split("").map(w => {
    if (w.match(/[0-9]/)) return parseInt(w, 10);
    // charcode a is 97. a->10 b->11 ...
    else if (w.match(/[a-z]/)) return w.charCodeAt() - 87;

    throw new Error("invalid steswap notation", str);
  });
};

export default new Vue({
  computed: {
    nextThrowTime() {
      return (this.elapsed + 1) * this.unitTime;
    },
    heightNums() {
      return siteswapNotationToNumArray(this.siteswapStr);
    },
    isValid() {
      return isValid(this.heightNums);
    },
    currentHeight() {
      const offset = this.elapsed % this.heightNums.length;
      return this.heightNums[offset];
    }
  },
  data() {
    return {
      acceleration: 20,
      elapsed: 0,
      unitTime: 0.25,
      siteswapStr: "441"
    };
  }
});
