<template>
  <!-- ref/children 
  ref如果绑定在组件中(普通元素中)，那么通过this.$refs.refname获取到的是一个组件对象(元素对象d)-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
      message: "拿到了",
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
    });

    this.scroll.scrollTo(0, 0);
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style>
</style>