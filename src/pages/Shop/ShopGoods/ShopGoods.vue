<!--  -->
<template>
  <div>
		<div class="goods">
			<!-- 左侧菜单选项 -->
			<div class="menu-wrapper" ref="menuWrapper" >
				<!-- 菜单对应的食品列表 -->
				<ul>
					<li class="menu-item" v-for="(good, index) in goods" :key="index" :class="{current: index===currentIndex}" @click="clickMenuItem(index)">
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
					<li class="food-list-hook" v-for="(good, index) in goods" :key="index">
						<h1 class="title">{{good.name}}</h1>
						<ul>
							<li class="food-item bottom-border-1px" v-for="(item, index) in good.foods" :key="index" @click="showFood(item)">
								<div class="icon">
									<img width="57" height="57" :src="item.icon">
								</div>
								<div class="content">
									<h2 class="name">{{item.name}}</h2>
									<p class="desc">{{item.description}}</p>
									<div class="extra">
										<span class="count">月售{{item.sellCount}}份</span>
										<span>好评率{{item.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{item.price}}</span>
										<span class="old" v-if="item.oldPrice">￥{{item.oldPrice}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<CartControl :food="item"></CartControl>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shopCart></shopCart>
		</div>
		<Food :foodDesc="foodDesc" ref="food"></Food>
	
	
	</div> 
</template>

<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
import Food from "../../../components/Food/Food.vue";
import CartControl from "../../../components/CartControl/CartControl.vue";
import ShopCart from "../../../components/ShopCart/ShopCart.vue";
export default {
  data() {
    return {
      scrollY: 0, // 右侧Y轴滚动的坐标
      tops: [], //包含右侧所有分类小列表的top值
      foodDesc: {} //需要显示的food
    };
  },
  mounted() {
    this.$store.dispatch("getShopGoods", () => {
      this.$nextTick(() => {
        this._initScroll();
        this._initTops();
      });
    });
  },
  computed: {
    ...mapState(["goods", "food"]),

    //计算当前分类的下标
    currentIndex() {
      const { scrollY, tops } = this;
      //根据计算产生一个结果
      const index = tops.findIndex((top, index) => {
        // scrollY >= 当前 top && scroll < 下一个top
        return scrollY >= top && scrollY < tops[index + 1];
      });
      // console.log(tops);
      return index;
    }
  },
  methods: {
    //初始化滚动
    _initScroll() {
      //列表显示之后创建
      new BScroll(".menu-wrapper", {
        click: true
      });
      //根据文档配置scroll
      this.foodsScroll = new BScroll(".foods-wrapper", {
        probeType: 2,
        click: true
      });
      //右侧列表绑定scroll监听
      this.foodsScroll.on("scroll", ({ x, y }) => {
        // console.log(x, y);
        this.scrollY = Math.abs(y);
      });
      this.foodsScroll.on("scrollEnd", ({ x, y }) => {
        this.scrollY = Math.abs(y);
      });
    },
    //初始化tops
    _initTops() {
      const tops = [];
      let top = 0;
      tops.push(top);
      //在foods列表下找到所有分类的li
      const lis = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight;
        tops.push(top);
      });
      //更新数据
      this.tops = tops;
    },
    clickMenuItem(index) {
      //得到目标位置的scrollY
      const scrollY = this.tops[index];
      //立即更新ScrollY(让点击的分类项成为当前分类)
      this.scrollY = scrollY;
      //平滑滑动右侧列表 better-scroll里的方法
      this.foodsScroll.scrollTo(0, -scrollY, 300);
    },
    //显示点击的food
    showFood(food) {
      //设置要传递给food的组件的数据
      this.foodDesc = food;
      console.log(food);
      //显示food组件(在父组件中调用子组件对象的方法)
      this.$refs.food.toggleShow();
    }
  },
  components: {
    Food,
    CartControl,
    ShopCart
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl';

.goods {
	display: flex;
	position: absolute;
	top: 195px;
	bottom: 46px;
	width: 100%;
	background: #fff;
	overflow: hidden;

	.menu-wrapper {
		flex: 0 0 80px;
		width: 80px;
		background: #f3f5f7;

		.menu-item {
			display: table;
			height: 54px;
			width: 56px;
			padding: 0 12px;
			line-height: 14px;

			&.current {
				position: relative;
				z-index: 10;
				margin-top: -1px;
				background: #fff;
				color: $green;
				font-weight: 700;

				.text {
					border-none();
				}
			}

			.icon {
				display: inline-block;
				vertical-align: top;
				width: 12px;
				height: 12px;
				margin-right: 2px;
				background-size: 12px 12px;
				background-repeat: no-repeat;
			}

			.text {
				display: table-cell;
				width: 56px;
				vertical-align: middle;
				bottom-border-1px(rgba(7, 17, 27, 0.1));
				font-size: 12px;
			}
		}
	}

	.foods-wrapper {
		flex: 1;

		.title {
			padding-left: 14px;
			height: 26px;
			line-height: 26px;
			border-left: 2px solid #d9dde1;
			font-size: 12px;
			color: rgb(147, 153, 159);
			background: #f3f5f7;
		}

		.food-item {
			display: flex;
			margin: 18px;
			padding-bottom: 18px;
			bottom-border-1px(rgba(7, 17, 27, 0.1));

			&:last-child {
				border-none();
				margin-bottom: 0;
			}

			.icon {
				flex: 0 0 57px;
				margin-right: 10px;
			}

			.content {
				flex: 1;

				.name {
					margin: 2px 0 8px 0;
					height: 14px;
					line-height: 14px;
					font-size: 14px;
					color: rgb(7, 17, 27);
				}

				.desc, .extra {
					line-height: 10px;
					font-size: 10px;
					color: rgb(147, 153, 159);
				}

				.desc {
					line-height: 12px;
					margin-bottom: 8px;
				}

				.extra {
					.count {
						margin-right: 12px;
					}
				}

				.price {
					font-weight: 700;
					line-height: 24px;

					.now {
						margin-right: 8px;
						font-size: 14px;
						color: rgb(240, 20, 20);
					}

					.old {
						text-decoration: line-through;
						font-size: 10px;
						color: rgb(147, 153, 159);
					}
				}

				.cartcontrol-wrapper {
					position: absolute;
					right: 0;
					bottom: 12px;
				}
			}
		}
	}
}
</style>
