<!--  -->
<template>
  <div>
      <div class="goods">
          <!-- 左侧菜单选项 -->
          <div class="menu-wrapper" ref="menuWrapper" :class="{current: index === currentIndex}">
              <!-- 菜单对应的食品列表 -->
              <ul>
                  <li class="menu-item" v-for="(good, index) in goods" :key="index">
                      <span class="text bottom-border-1px">
                          <img :src="good.icon" v-if="good.icon" class="icon">
                          {{good.name}}
                      </span>
                  </li>
              </ul>
          </div>
          <!-- 右侧食物列表 -->
          <div class="foods-wrapper" ref="foodsWrapper">
              <!-- 右侧食物列表根据左边来显示 -->
              <!-- 所以右侧是在一个分类标题列表里面嵌套着各类食物列表 -->
              <ul>
                  <li class="food-list-hook" v-for="(good, index) in goods" :key="index"></li>
                  <li class="food-list-hook">
                      <h1 class="title">{{good.name}}</h1>
                      <ul>
                          <li>南瓜粥</li>
                          <li>红豆薏米美肤粥</li>
                      </ul>
                  </li>
                  <li class="food-list-hook">
                      <h1 class="title">优惠</h1>
                      <ul>
                          <li>红枣山药</li>
                          <li>...</li>
                      </ul>
                  </li>
                  <li>其他分类...</li>
              </ul>
          </div>
      </div>
  </div> 
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getShopGoods");
    console.log("dad");
  },
  computed: {
    ...mapState(["goods"])
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>