<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精品']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精品']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!--修饰符 .native :在我们需要监听一个组件的原生事件时，
    必须给对应的事件加上 .native 才能监听原生组件-->
    <!-- <ul>
      <li>1列表</li>
      <li>2列表</li>
      <li>3列表</li>
      <li>4列表</li>
      <li>5列表</li>
      <li>6列表</li>
      <li>7列表</li>
      <li>8列表</li>
      <li>9列表</li>
      <li>10列表</li>
      <li>11列表</li>
      <li>12列表</li>
      <li>13列表</li>
      <li>14列表</li>
      <li>15列表</li>
      <li>16列表</li>
      <li>17列表</li>
      <li>18列表</li>
      <li>19列表</li>
      <li>20列表</li>
      <li>21列表</li>
      <li>22列表</li>
      <li>23列表</li>
      <li>24列表</li>
      <li>25列表</li>
      <li>26列表</li>
      <li>27列表</li>
      <li>28列表</li>
      <li>29列表</li>
      <li>30列表</li>
      <li>31列表</li>
      <li>32列表</li>
      <li>33列表</li>
      <li>34列表</li>
      <li>35列表</li>
      <li>36列表</li>
      <li>37列表</li>
      <li>38列表</li>
      <li>39列表</li>
      <li>40列表</li>
      <li>41列表</li>
      <li>42列表</li>
      <li>43列表</li>
      <li>44列表</li>
      <li>45列表</li>
      <li>46列表</li>
      <li>47列表</li>
      <li>48列表</li>
      <li>49列表</li>
      <li>50列表</li>
    </ul>-->
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import { itemListenterMixin } from "common/mixin";

// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'

// import BScroll from "better-scroll";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins: [itemListenterMixin],
  data() {
    return {
      // result:null
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      // itemImgListenter: null,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  destroyed() {
    console.log("home destoryed");
  },
  activated() {
    // console.log("activated");
    // this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // 注意这里假如给0 会导致返回首页到顶部 可以给其他任意数或者不给值
    this.$refs.scroll.scrollTo(0, this.saveY, -1);
    // this.$refs.scroll.scrollTo(0, this.saveY);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1.保存Y值
    // console.log("deactivated");
    this.saveY = this.$refs.scroll.getScrollY();

    // 2.取消全局事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListenter);
  },
  created() {
    // 1. 请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // // 3.监听item中的图片加载完成
    // this.$bus.$on("itemImageLoad", () => {
    //   // console.log("-------");
    //   this.$refs.scroll.refresh();
    //   // console.log("-------");
    // });
    /**
     * 防抖函数 解决某一件事执行非常频繁的时候
     * 直接执行refresh  那么refresh函会被执行30次
     * 可以将refresh函数传入到debounce函数中，生成一个新的函数
     * 之后在调用非常频繁的时候，就使用新生成的函数
     * 而新生成的函数，并不会非常频繁的调用。如果下一次执行来的非常快，那么上一次取消掉
     */
    // // 1.图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh, 50);
    // // 对监听的事件进行保存
    // this.itemImgListenter = () => {
    //   refresh();
    // };
    // this.$bus.$on("itemImageLoad", this.itemImgListenter);
  },
  methods: {
    /**
     * 事件监听相关方法
     */

    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
      // this.$refs.scroll.scroll.scrollTo(0, 0);
      // console.log(this.$refs.scroll.message);
      // console.log("backClick");
    },
    contentScroll(position) {
      // 1. 判断BackTop是否显示
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;

      // 2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      // console.log("加载更多的方法");
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabOffsetTop);
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  /* vh: viewport height 
  视口高度 */
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content {
  /* height: 300px; */
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}

/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 51px;
} */
</style>