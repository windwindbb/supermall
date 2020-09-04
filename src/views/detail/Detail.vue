<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backTop" v-show="isShowBackTop" />
    <!-- <toast :message="message" :show="show" /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
// import Toast from "components/common/toast/Toast";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenter } from "common/mixin";
import { itemListenterMixin, backTopMixin } from "common/mixin";

import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast,
  },
  mixins: [itemListenterMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      // itemImgListenter: null,
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message: "",
      // show: false,
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      // 1.获取顶部轮播图的图片
      const data = res.result;
      this.topImages = res.result.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5. 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.获取评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // // 第一次获取，值不对
      // // 原因：this.$refs.params.$el根本没有进行渲染
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      // console.log(this.themeTopYs);

      // this.$nextTick(() => {
      //   // 第二次获取， 值不对
      //   // 原因：图片没有计算在内
      //   // 根据最新的数据，对应的DOM是已经被渲染出来
      //   // 但是图片依然是没有加载完（目前获取到的offsetTop不包含其中的图片）
      //   // offsetTop值不对的时候，都是因为图片的问题
      //   this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      // console.log(this.themeTopYs);
      // })
    });

    //3.请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });

    // 4.给getThemeTopY赋值（对给this.themeTopYs赋值的操作进行防抖）
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE); // hack做法

      // console.log(this.themeTopYs);
    });
  },
  mounted() {
    // console.log("mounted");
  },
  destoryed() {
    this.$bus.$off("itemImgLoad", this.itemImgListenter);
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log("----");
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // console.log(position);
      // 1.获取y值
      const positionY = -position.y;

      // 2.positionY和主题中的值进行对比
      let length = this.themeTopYs.length;
      // for (let i = 0; i < length; i++) {
      //   if (
      //     // 条件一：防止赋值过于频繁
      //     this.currentIndex !== i &&
      //     // 条件二：在0 和某个数字之间 （i === length-1）
      //     ((i < length - 1 &&
      //       positionY >= this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1]) ||
      //       (i === length - 1 && positionY >= this.themeTopYs[i]))
      //   ) {
      //     this.currentIndex = i;
      //     // console.log(this.currentIndex);
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }

      // hack做法 这种做法是手动的给this.themeTopYs添加一个最大值
      // 然后在遍历时 length - 1 不做循环
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      // 判断BackTop是否显示
      // this.isShowBackTop = -position.y > 1000;
      // console.log(-position.y);
      this.listenShowBackTop(position);
    },
    addToCart() {
      // console.log("-----");
      // 1.获取购物车需要展示的信息信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车 (1. Promise ,  2. mapActions)
      // this.$store.commit("addCart", product);

      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });

      this.addCart(product).then((res) => {
        // console.log(res);
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   (this.show = false), (this.message = "");
        // }, 1500);
        console.log(this.$toast);
        this.$toast.show(res, 2000);
      });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.content {
  background-color: #fff;
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>