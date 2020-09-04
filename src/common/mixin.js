import { debounce } from './utils'
import BackTop from "components/content/backTop/BackTop";

export const itemListenterMixin = {
  data() {
    return {
      itemImgListenter: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImgListenter = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListenter);
    // console.log("我是混入内容");
  }
}

// mixin 混入

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000
      // console.log(position);
    }
  }
}