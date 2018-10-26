import {
  reqAddress,
  reqCategorys,
  reqShops
} from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutations-types'
export default {
  //异步获取地址
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
  //异步获取分类列表
  async getCategorys({
    commit
  }) {
    const result = await reqCategorys()
    console.log(result)
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
  }
}
