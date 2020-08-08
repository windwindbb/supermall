<template>
  <div class="wrapper">
    <ul class="content">
      <li>1商品列表</li>
      <li>2商品列表</li>
      <li>3商品列表</li>
      <li>4商品列表</li>
      <li>5商品列表</li>
      <li>6商品列表</li>
      <li>7商品列表</li>
      <li>8商品列表</li>
      <li>9商品列表</li>
      <li>10商品列表</li>
      <li>11商品列表</li>
      <li>12商品列表</li>
      <li>13商品列表</li>
      <li>14商品列表</li>
      <li>15商品列表</li>
      <li>16商品列表</li>
      <li>17商品列表</li>
      <li>18商品列表</li>
      <li>19商品列表</li>
      <li>20商品列表</li>
      <li>21商品列表</li>
      <li>22商品列表</li>
      <li>23商品列表</li>
      <li>24商品列表</li>
      <li>25商品列表</li>
      <li>26商品列表</li>
      <li>27商品列表</li>
      <li>28商品列表</li>
      <li>29商品列表</li>
      <li>30商品列表</li>
      <li>31商品列表</li>
      <li>32商品列表</li>
      <li>33商品列表</li>
      <li>34商品列表</li>
      <li>35商品列表</li>
      <li>36商品列表</li>
      <li>37商品列表</li>
      <li>38商品列表</li>
      <li>39商品列表</li>
      <li>40商品列表</li>
      <li>41商品列表</li>
      <li>42商品列表</li>
      <li>43商品列表</li>
      <li>44商品列表</li>
      <li>45商品列表</li>
      <li>46商品列表</li>
      <li>47商品列表</li>
      <li>48商品列表</li>
      <li>49商品列表</li>
      <li>50商品列表</li>
      <li>51商品列表</li>
      <li>52商品列表</li>
      <li>53商品列表</li>
      <li>54商品列表</li>
      <li>55商品列表</li>
      <li>56商品列表</li>
      <li>57商品列表</li>
      <li>58商品列表</li>
      <li>59商品列表</li>
      <li>60商品列表</li>
      <li>61商品列表</li>
      <li>62商品列表</li>
      <li>63商品列表</li>
      <li>64商品列表</li>
      <li>65商品列表</li>
      <li>66商品列表</li>
      <li>67商品列表</li>
      <li>68商品列表</li>
      <li>69商品列表</li>
      <li>70商品列表</li>
      <li>71商品列表</li>
      <li>72商品列表</li>
      <li>73商品列表</li>
      <li>74商品列表</li>
      <li>75商品列表</li>
      <li>76商品列表</li>
      <li>77商品列表</li>
      <li>78商品列表</li>
      <li>79商品列表</li>
      <li>80商品列表</li>
      <li>81商品列表</li>
      <li>82商品列表</li>
      <li>83商品列表</li>
      <li>84商品列表</li>
      <li>85商品列表</li>
      <li>86商品列表</li>
      <li>87商品列表</li>
      <li>88商品列表</li>
      <li>89商品列表</li>
      <li>90商品列表</li>
      <li>91商品列表</li>
      <li>92商品列表</li>
      <li>93商品列表</li>
      <li>94商品列表</li>
      <li>95商品列表</li>
      <li>96商品列表</li>
      <li>97商品列表</li>
      <li>98商品列表</li>
      <li>99商品列表</li>
      <li>100商品列表</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Category",
  data() {
    return {
      scroll: null,
    };
  },
  // created(){
  //   new BScroll({

  //   })
  // }
  mounted() {
    this.scroll = new BScroll(document.querySelector(".wrapper"), {
      probeType: 3,
      pullUpLoad: true,
    });

    this.on("scroll", (position) => {
      console.log(position);
    });

    this.on("pullingUp", () => {
      console.log("上拉加载更多");
    });
  },
};
</script>

<style scoped>
.wapper {
  height: 150px;
  background-color: blue;

  /* overflow: hidden; */
  /* overflow-y: scroll; */
}
</style>