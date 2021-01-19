import axios from './axios'

// axios调接口，
// 如果是GET请求，入参使用 params属性
// 如果是POST请求，入参使用 data 属性

// 调接口，永远思考三个基础问题：
// 1、url是多少？
// 2、是什么请求方式？GET/POST
// 3、入参有哪些？哪些入参是必填？哪些是非必填？参数的数据类型是怎样的？


// 如何确定一个接口，要不要走完整的Vuex流程？
// 1、该接口返回的数据，要不要跨组件共享
// 2、该接口返回的数据，要不要做缓存处理

// 获取商品列表
export function fetchGoodList(params) {
  return axios({
    url: '/jd/good/list',
    method: 'GET',
    params
  })
}

// 获取商品详情
export function fetchGoodInfo(params) {
  return axios({
    url: '/jd/good/detail',
    method: 'GET',
    params
  })
}

// 注册
export function fetchRegist(data) {
  return axios({
    url: '/user/regist',
    method: 'POST',
    data
  })
}
// 登录
export function fetchLogin(data) {
  return axios({
    url: '/user/login',
    method: 'POST',
    data
  })
}

// 添加到购物车
export function fetchAddCart(data) {
  return axios({
    url: '/jd/cart/add',
    method: 'POST',
    data
  })
}

// 获取购物车中的商品列表
export function fetchCartList(params) {
  return axios({
    url: '/jd/cart/list',
    method: 'GET',
    params
  })
}

// 删除购物车中的一条商品
export const fetchDelCart = params => axios({
  url: '/jd/cart/del',
  method: 'GET',
  params
})

// 改变购物车中商品的数量
export const fetchUpdCart = data => axios({
  url: '/jd/cart/update',
  method: 'POST',
  data
})

// 提交购物车
export const fetchSubmit = data => axios({
  url: '/jd/cart/submit',
  method: 'POST',
  data
})

// 获取品类列表
export const fetchAllCates = params => axios({
  url: '/jd/cates',
  params
})

// 获取轮播图
export const fetchAdList = params => axios({
  params,
  url: '/jd/ad/list'
})


// 这样做的目的，为了将挂在Vue.prototype原型链上，然后在组件中就可以使用this来访问
export default {
  fetchGoodList,
  fetchGoodInfo,
  fetchRegist,
  fetchLogin,
  fetchAddCart,
  fetchCartList,
  fetchDelCart,
  fetchUpdCart,
  fetchSubmit,
  fetchAllCates,
  fetchAdList
}

// 在同一个js模块中:
// 可以使用多个 export
// 但最多只能有一个 export default

// 使用 `export` 抛出，必须使用 `import {} from './'` 导入
// 使用 `export default` 抛出，必须使用 `import abc from './'` 导入
