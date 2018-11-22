import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import City from '../pages/City/City.vue'
//路由懒加载
const MSite = () => import('../pages/MSite/MSite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')


//声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  // mode: 'history', //去掉URL中的哈希#
  routes: [{
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: MSite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [{
        path: '/shop/goods',
        component: ShopGoods
      }, {
        path: '/shop/ratings',
        component: ShopRatings
      }, {
        path: '/shop/info',
        component: ShopInfo
      }, {
        path: '',
        redirect: '/shop/goods'
      }]
    },
    {
      path: '/city',
      component: City
    }
  ]
})
