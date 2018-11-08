<!--  -->
<template>
  <section class="msite">
    <HeaderTop :title="address.name">
      <span class="header_search" slot="left">
        <router-link to="/search">
        <i class="iconfont icon-sousuo"></i>        
        </router-link>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">
          <router-link :to="userInfo._id ? '/userinfo' : '/login'" class="profile-link">
          <span class="header_login_text" v-if="!userInfo._id">
            登录|注册
          </span>
          <span class="header_login_text" v-else>
            <i class="iconfont icon-sousuo"></i>
          </span>
          </router-link>
        </span>
      </span>
    </HeaderTop>
    <!-- 首页导航轮播 -->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(pages, index) in categorysArr" :key="index">
            <a href="javascript:;" class="link_to_food" v-for="(data, index) in pages" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl + data.image_url">
              </div>
              <span>{{data.title}}</span>
            </a>
          </div>
        </div>
          <!-- 轮播图页码 -->
         <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
     <!--首页附近商家列表-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </section>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import ShopList from "../../components/ShopList/ShopList.vue";
import Swiper from "swiper";
import axios from "axios";
import { mapState } from "vuex";
import "swiper/dist/css/swiper.min.css";
export default {
  data() {
    return {
      baseImageUrl: "https://fuss10.elemecdn.com"
    };
  },
  created() {},
  computed: {
    ...mapState(["address", "categorys", "userInfo"]),
    /**
     * 根据categorys一维数组生成二维数组
     * 小数组中的元素个数最大是8
     */
    categorysArr() {
      //1.先从当前组件中得到所有食品分类的一维数组
      const { categorys } = this;
      //2.准备一个空的二维数组--categorysArr
      const arr = [];
      //3.准备一个小数组 -- pages(最大长度为8)
      let minArr = [];
      //4.遍历categorys得到处理后的二维数组categorysArr
      categorys.forEach(data => {
        //如果当前小数组(pages)已经满了，创建一个新的
        if (minArr.length === 8) {
          minArr = [];
        }
        if (minArr.length === 0) {
          arr.push(minArr);
        }
        //将分类信息保存到小数组(pages)中
        minArr.push(data);
      });
      return arr;
    }
  },
  watch: {
    categorys(value) {
      //轮播
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          autoplay: true,
          paination: {
            el: ".swiper-paination",
            clickable: true
          }
        });
      });
    }
  },
  mounted() {
    this.$store.dispatch("getCategorys");
    this.$store.dispatch("getShops");
  },
  components: {
    HeaderTop,
    ShopList
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.msite { // 首页
  width: 100%;

  .header {
    background-color: #02a774;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 45px;

    .header_search {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 10%;
      height: 50%;

      .icon-sousuo {
        font-size: 25px;
        color: #fff;
      }
    }

    .header_title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      color: #fff;
      text-align: center;

      .header_title_text {
        font-size: 20px;
        color: #fff;
        display: block;
      }
    }

    .header_login {
      font-size: 14px;
      color: #fff;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);

      .header_login_text {
        color: #fff;

        .profile-link {
          color: #fff;
        }
      }
    }
  }

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .icon-xuanxiang {
        font-size: 17px;
      }

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>