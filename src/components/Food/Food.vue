<!--  -->
<template>
  <div class="food" v-if="isShow">
		<div class="food-content">
			<div class="image-header">
				<img src="" alt="">
				<p class="foodpanel-desc"></p>
				<div class="back">
					<i class="iconfont icon-arrow_left"></i>
				</div>
			</div>
			<div class="content">
				<h1 class="title"></h1>
				<div class="detail">
					<span class="sell-count"></span>
					<span class="rating"></span>
				</div>
				<div class="price">
					<span class="now"></span>
					<span class="old"></span>
				</div>
				<div class="cartcontrol-wrapper">
					<CartControl :food="food"></CartControl>
				</div>
			</div>
		</div>
	  <div class="food-cover"></div>
  </div>
</template>

<script>
import CartControl from "../CartControl/CartControl.vue";
export default {
  data() {
    return {
      isShow: false
    };
  },
  props: {
    food: Object
  },
  methods: {
    toggleShow() {
      this.isShow = !this.isShow;
    }
  },
  components: {
    CartControl
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>