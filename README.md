created by xhf at 2021-01-04


如何使用脚手架项目？

如何安装并配置路由系统？

如何自定义端口号、自动打开浏览器？

如何支持sass？

如何安装并配置Vuex？

如何安装并封装axios？


如何配置H5中的rem布局？
* WebApp：长得像、交互也像App的移动端H5网页，叫做webapp
* dpr(手机夜晶屏幕的像素密度) = 屏幕总px宽度 / 屏幕的物理宽度
* 结论：在写移动端网页时，不能使用px这种绝对单位，要使用相对单位（rem）

* px 绝对单位
* em 相对单位，相对于最近的一个有font-size属性的父级元素
* rem 相对单位(root em)，相对html元素的font-size属性

* rem配置使用步骤：
  * 在public/index.html中引入rem.js文件
  * 在代码编辑器中安装px to rem & rpx (cssrem)插件
  * 并配置该插件的 "Root Font Size" = 75 即可。
  * 在样式文件中写样式，使用px单位，会自动转化成 rem单位。


如何使用UI组件库？(Vant UI)
  * cnpm install vant -S
  * cnpm install babel-plugin-import -D
  * 在babal.config.js中添加“按需导入”的plugins插件
  * 配置完成之后，重启项目才能生效

首页需求：
  * 自定义通知NoticeBar
  * 使用轮播图
  * 实现商品列表、包括下拉刷新、触底加载的交互功能

静态交互开发 10~20天 主要和UI、产品经理
接口联调   20~40天   主要和后端
bug修改 
环境搭建、项目架构、项目部署

接口文档：

[baseUrl] = http://10.36.149.14:9999

1、获取商品列表
[GET] /api/v1/jd/good/list
[入参]  size=10, page=1, cate='', hot=false 都是非必填

2、获取商品详情
[GET] /api/v1/jd/good/detail
[入参] id 必填

3、用户注册接口

[POST] /api/v1/user/regist
[入参] username, password, password2 都是必填

4、用户登录接口

[POST] /api/v1/user/login
[入参] username, password 都是必填

5、添加到购物车

[POST] /api/v1/jd/cart/add
[入参] num 非必填(默认是1), good_id 必填

6、获取购物车商品列表

[GET] /api/v1/jd/cart/list
[入参] 没有入参

7、删除购物车中的一条商品

[GET] /api/v1/jd/cart/del
[入参] id 是购物车列表中一条下单记录的 _id

8、改变购物车中商品的数量

[POST] /api/v1/jd/cart/update
[入参]  id  num必填

9、提交购物车

[POST] /api/v1/jd/cart/submit
[入参] goods 必填，是购物车行记录的多个 _id 由 ; 连接而成的字符串

10、获取所有品类

[GET]  /api/v1/jd/cates
[入参]  无
