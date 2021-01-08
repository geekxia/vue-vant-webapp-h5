import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from '@/views/'

const router = new VueRouter({
  mode: 'hash',
  routes: [
    ...routes,
    {path: '/*', redirect: '/home'}
  ]
})

// 全局路由守卫
// 作用：根据某些权限拦截指定页面，让没有权限的用户看不到那些页面
router.beforeEach((to, from, next)=>{
  console.log('去哪里', to)
  console.log('从哪里来', from)
  // next() 是否允许你进入下一步

  // 把所有有权限的页面路径，都放在这个数组中
  const pages = ['/cart', '/user']

  if(pages.includes(to.path)){
    // 如何to.path在 pages中，说明你想去到的页面是有权限的，需要进行判断、拦截
    let token = localStorage.getItem('token')
    if(token){
      next()
    }else{
      next('/login')
    }
  }else{
    // 如果to.path不在pages中，说明你想去的页面是开放的，不需要拦截
    next()
  }
})

export default router
