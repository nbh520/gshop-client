import axios from 'axios'
/**
 *向外部暴露一个函数ajax
 *
 * @export
 * @param {string} [url=''] 请求路径，默认为空
 * @param {*} [data={}] 请求参数，默认为空对象
 * @param {string} [type='GET'] 请求方法，默认为GET
 */
export default function ajax(url = '', data = {}, type = 'GET') {
  //返回值Promise对象 （异步返回的数据是response.data,而不是response)
  return new Promise(function (resolve, reject) {
    //(利用axios)异步执行ajax请求
    let promise; //保存axios的返回值(promise对象)
    if (type === 'GET') {
      //准备URL query参数数据
      let dataStr = ''; //数据拼接
    }
  })

}
