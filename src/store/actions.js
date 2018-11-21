import {
  reqAddress,
  reqCurrentAddress,
  reqCategorys,
  reqShops,
  reqUserInfo,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo,
  reqSearchShop
} from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CURRENT_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_SEARCH_SHOPS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutations-types'

export default {
  //根据经纬度获取当前地址
  async getAddress({
    commit,
    state
  }) {
    //从state状态中获取到经纬度从来设置reqAddress的参数
    const geohash = state.latitude + ',' + state.longitude
    //1. 发送异步请求
    const result = await reqAddress(geohash)
    //2. 根据结果提交一个mutation
    commit(RECEIVE_ADDRESS, {
      address: result.data
    })
  },

  //获取当前地理位置
  async getCurrentAddress({
    commit,
    state
  }) {
    const result = await reqCurrentAddress();
    state.latitude = result.latitude
    state.longitude = result.longitude
    commit(RECEIVE_CURRENT_ADDRESS, {
      address: result
    })

  },

  //异步获取分类列表
  async getCategorys({
    commit
  }) {
    const result = await reqCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {
        categorys
      })
    }
  },

  //异步获取商家列表
  async getShops({
    commit,
    state
  }) {
    const {
      latitude,
      longitude
    } = state
    const result = await reqShops({
      latitude,
      longitude
    })
    commit(RECEIVE_SHOPS, {
      shops: result.data
    })
  },

  //同步记录用户信息
  recordUser({
    commit
  }, userInfo) {
    commit(RECEIVE_USER_INFO, {
      userInfo
    })
  },


  //获取用户信息
  async getUserInfo({
    commit
  }) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {
        userInfo
      })
    }
  },

  //退出登录
  async logout({
    commit
  }) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },

  //获取商家信息
  async getShopInfo({
    commit
  }) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {
        info
      })
    }
  },

  //获取商品评论列表
  async getShopRatings({
    commit
  }) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {
        ratings
      })
    }
  },

  //获取商品列表
  async getShopGoods({
    commit
  }, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {
        goods
      })
      //数据更新后通知组件
      callback && callback()
    }
  },

  //同步更新food中count的值.
  updateFoodCount({
    commit
  }, {
    isAdd,
    food
  }) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {
        food
      })
    } else {
      commit(DECREMENT_FOOD_COUNT, {
        food
      })
    }
  },
  // 同步清空购物车
  clearCart({
    commit
  }) {
    commit(CLEAR_CART)
  },

  //获取商家商品列表的action
  async searchShops({
    commit,
    state
  }, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      console.log(searchShops)
      commit(RECEIVE_SEARCH_SHOPS, {
        searchShops
      })
    }
  }
}
