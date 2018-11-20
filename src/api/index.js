import ajax from './ajax'
// const BASE_URL = '/api'
const BASE_URL = process.env.API_ROOT;
/**
 * 获取当前地址
 * 固定数据
 */
export const reqAddress = geohash => ajax(`${BASE_URL}/position/${geohash}`)


export const reqCurrentAddress = () => ajax()
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
/**
 * 账号密码登录
 */
export const reqPwdLogin = ({
  name,
  pwd,
  captcha
}) => ajax(BASE_URL + '/login_pwd', {
  name,
  pwd,
  captcha
}, 'POST')
/**
 * 获取用户信息
 */
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')

/**
 * 退出登录
 */
export const reqLogout = () => ajax(BASE_URL + '/logout')

/**
 * 获取商家信息 (由mock进行拦截)
 */
export const reqShopInfo = () => ajax('/info')
/** 
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')
/** 
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')

/**
 * 根据经纬度和关键字搜索商铺列表的接口
 * @param {*} geohash
 * @param {*} keyword
 */
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL + '/search_shops', {
  geohash,
  keyword
})
