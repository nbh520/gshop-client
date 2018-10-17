import ajax from './ajax'
import axios from 'axios'
import fetch from './fetch'
axios.defaults.baseURL = 'https://elm.cangdu.org'
const BASE_URL = 'https://elm.cangdu.org'
/**
 *获取当前地址
 * 
 */
// const reqAddress = (type = 'guess') => {
//   return axios.get(`/v1/cities?type=${type}`)
// }
export const reqAddress = () => ajax(`${BASE_URL}/v1/cities`, {
  type: 'guess'
})
