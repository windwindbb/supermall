<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banner" />
    <recommend-view :recommends="recommend" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./chlidComps/HomeSwiper";
import RecommendView from "./chlidComps/RecommendView";

import { getHomeMultidata } from "network/home";
// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
  },
  data() {
    return {
      // result:null
      banners: [],
      recommends: [],
    };
  },
  created() {
    // 1. 请求多个数据
    getHomeMultidata().then((res) => {
      // console.log(res);
      // this.result = res;
      this.banners = res.data.banner.list;
      this.recommends = res.data.component.list;
    });
  },
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>