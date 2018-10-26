import ajax from './ajax'
import axios from 'axios'
import fetch from './fetch'
const BASE_URL = '/api'
/**
 *获取当前地址
 */
export const reqAddress = geohash => ajax(`${BASE_URL}/position/${geohash}`)
/**
 * 获取 msite 页面食品分类列表
 */
export const reqCategorys = () => ajax(BASE_URL + '/index_category')
/**
 * 获取 msite 商铺列表(根据query参数：经纬度)
 * 将经纬度两个数据作为一个参数对象传入
 * 也可以两个数据分别传入ajax， 然后再放入一个对象参数内， 如下面的手机号接口
 */
export const reqShops = ({
  latitude,
  longitude
}) => ajax(BASE_URL + '/shops', {
  latitude,
  longitude
})
