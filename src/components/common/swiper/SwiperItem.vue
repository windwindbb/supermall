<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Slide",
};
</script>

<style scoped>
.slide {
  widows: 100%;
  flex-shrink: 0;
}

.slide img {
  widows: 100%;
}
</style>