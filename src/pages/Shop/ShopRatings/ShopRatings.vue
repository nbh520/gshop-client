<!--  -->
<template>
  <div class="ratings" ref="ratings">
    <div class="rating-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score"></h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家99%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <span class="score"> {{info.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="spit"></div>

      <div class="ratingselect">
        <div class="rating-type border-1p">
          <span class="block positive">
            全部<span class="count"></span>
          </span>
          <span class="block positive">
            满意<span class="count"></span>
          </span>
          <span class="block positive">
            不满意<span class="count"></span>
          </span>
        </div>
        <div class="switch">
          <span class="iconfont icon-checkcircle"></span>
          <span class="text">只看内容的评价</span>
        </div>
      </div>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(item, index) in ratings" :key="index">
            <div class="avatar">
              <img :src="item.avatar" width="28" height="28" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{item.username}}</h1>
              <div class="star-wrapper">
                <span class="delivery"></span>
              </div>
              <p class="text">{{item.text}}</p>
              <div class="recommend">
                <span class="iconfont"></span>
                <span class="item" v-for="(label, index) in item.recommend" :key="index">{{label}}</span>
              </div>
              <div class="item"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Star from "../../../components/Star/Star.vue";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      onlyShowText: true, //是否只显示有文本的
      selectType: 2 //选择评价类型：0 满意 ， 1不满意， 2全部
    };
  },
  //先触发action请求rating数据
  mounted() {
    this.$store.dispatch("getShopRatings", () => {
      this.$nextTick(() => {
        new BScroll(this.$refs.ratings, {
          click: true
        });
      });
    });
    setTimeout(() => {
      console.log(this.info);
    }, 1000);
  },
  computed: {
    ...mapState(["info", "ratings"]),
    ...mapGetters(["positiveSize"]),
    filterRatings() {
      // 得到相关数据;
      const { ratings, onlyShowText, selectType } = this;
      return ratings.filter(rating => {
        const { rateType, text } = rating;
        return (
          (selectType === 2 || selectType === rateType) &&
          (!onlyShowText || text.length > 0)
        );
      });
    }
  },
  filters: {
    dateFormat: function(input) {
      let d = new Date(input);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate() < 10 ? "0" : d.getDate() + "" + d.getDate();
      let hour = d.getHours();
      let minutes = d.getMinutes();
      let seconds = d.getSeconds();
      return (
        year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + day
      );
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl';

.ratings {
  position: absolute;
  top: 195px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  background: #fff;

  .overview {
    display: flex;
    padding: 18px 0;

    .overview-left {
      flex: 0 0 137px;
      padding: 6px 0;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;

      @media only screen and (max-width: 320px) {
        flex: 0 0 120px;
        width: 120px;
      }

      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }

      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }

      .rank {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;

      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }

      .score-wrapper {
        margin-bottom: 8px;
        font-size: 0;

        .title {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .star {
          display: inline-block;
          margin: 0 12px;
          vertical-align: top;
        }

        .score {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          margin-left: 10px;
          color: rgb(255, 153, 0);
        }
      }

      .delivery-wrapper {
        font-size: 0;

        .title {
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .delivery {
          margin-left: 10px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }

  .split {
    width: 100%;
    height: 16px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    background: #f3f5f7;
  }

  .ratingselect {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      border-1px(rgba(7, 17, 27, 0.1));
      font-size: 0;

      .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        line-height: 16px;
        border-radius: 1px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        background: rgba(77, 85, 93, 0.2);

        &.active {
          background: $green;
          color: #fff;
        }

        .count {
          margin-left: 2px;
          font-size: 8px;
        }
      }
    }

    .switch {
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      color: rgb(147, 153, 159);
      font-size: 0;

      &.on {
        .icon-checkcircle {
          color: $green;
        }
      }

      .icon-checkcircle {
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
      }

      .text {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
      }
    }
  }

  .rating-wrapper {
    padding: 0 18px;

    .rating-item {
      display: flex;
      padding: 18px 0;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;

        img {
          border-radius: 50%;
        }
      }

      .content {
        position: relative;
        flex: 1;

        .name {
          margin-bottom: 4px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }

        .star-wrapper {
          margin-bottom: 6px;
          font-size: 0;

          .star {
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
          }

          .delivery {
            display: inline-block;
            vertical-align: top;
            height: 12px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .text {
          margin-bottom: 8px;
          line-height: 18px;
          color: rgb(7, 17, 27);
          font-size: 12px;
        }

        .recommend {
          line-height: 16px;
          font-size: 0;

          .icon-thumb_up, .icon-thumb_down, .item {
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
          }

          .icon-thumb_up {
            color: $yellow;
          }

          .icon-thumb_down {
            color: rgb(147, 153, 159);
          }

          .item {
            padding: 0 6px;
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            color: rgb(147, 153, 159);
            background: #fff;
          }
        }

        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>
