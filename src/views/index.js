const Home = ()=>import('./home/Home.vue')
const Find = ()=>import('./find/Find.vue')
const Cart = ()=>import('./cart/Cart.vue')
const User = ()=>import('./user/User.vue')
const GoodInfo = ()=>import('./home/GoodInfo.vue')
const Login = ()=>import('./user/Login.vue')
const Regist = ()=>import('./user/Regist.vue')

export default [
  { path: '/home', components: { alive: Home } },
  { path: '/find', component: Find },
  { path: '/cart', component: Cart },
  { path: '/user', component: User },
  { path: '/good/:id', component: GoodInfo, props: true },
  { path: '/login', component: Login },
  { path: '/regist', component: Regist }
]
