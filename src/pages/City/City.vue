<!-- 选择城市 -->
<template>
  <section class="city">
    <HeaderTop :title="'选择城市'">
       <span class="header_login" slot="right">
        <span class="header_login_text">
          <!-- <router-link :to="userInfo._id ? '/userinfo' : '/login'" class="profile-link"> -->
          <span class="header_login_text" > <!-- v-if="!userInfo._id"-->
            登录|注册
          </span>
          <!-- <span class="header_login_text" v-else> 
            <i class="iconfont icon-sousuo"></i>
          </span> -->
          <!-- </router-link> -->
        </span>
      </span>
    </HeaderTop>
    <div class="position-city-text">
      <span class="left-text">当前定位城市：</span>
      <span class="right-text">定位不准时请在列表中选择</span>
    </div>
    <div class="now-city">
      <span class="left-now-city">武汉</span>
      <span class="right-now-city">
        <i class="iconfont icon-jiantou1"></i>
      </span>
    </div>
    <div class="popular-city">
      <div class="popular-city-title">
        <span>热门城市</span>
      </div>
      <ul class="popular-city-list">
        <li>上海</li>
        <li>哈尔滨</li>
        <li>南京</li>
        <li>广州</li>
        <li>厦门</li>
        <li>杭州</li>
        <li>天津</li>
        <li>青岛</li>
      </ul>
    </div>
    正在编写中
  </section>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";

export default {
  data() {
    return {};
  },
  components: {
    HeaderTop
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.city {
  margin-top: 45px;

  .position-city-text {
    height: 40px;
    bottom-border-1px(#ccc);
    line-height: 40px;
    color: #333;
    font-size: 15px;

    .left-text {
      float: left;
      margin-left: 10px;
    }

    .right-text {
      float: right;
      font-size: 12px;
      margin-right: 10px;
      font-weight: bold;
    }
  }

  .now-city {
    height: 40px;
    line-height: 40px;
    bottom-border-1px(#ccc);

    .left-now-city {
      margin-left: 10px;
      color: $green;
    }

    .right-now-city {
      float: right;
      margin-right: 10px;

      .iconfont {
        font-size: 14px;
      }
    }
  }

  .popular-city {
    .popular-city-title {
      height: 40px;
      line-height: 40px;
      margin-top: 25px;
      top-border-1px(#ccc);
      bottom-border-1px(#ccc);

      >span {
        margin-left: 10px;
      }
    }

    >ul {
      font-size: 0px;

      li {
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: $green;
        box-sizing: border-box;
        border: 1px solid #ccc;
        display: inline-block;
        width: 25%;
      }
    }
  }
}
</style>