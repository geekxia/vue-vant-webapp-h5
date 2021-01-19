<template>
<div class="qf-home">
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

    <!-- 通知栏 -->
    <van-notice-bar
      left-icon="volume-o"
      :text="msg"
      color="#ffffff"
      background="#F41206"
      mode="closeable"
      @close='noticeClose'
    />

    <!-- 轮播图 -->
    <van-swipe :autoplay="5000" @change='swipeChange'>
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img class='qf-swipe-img' v-lazy="$img.url+item.img" />
      </van-swipe-item>
      <template #indicator>
        <div class="qf-indicator">
          <span
            v-for='i in images.length'
            :class='{"on":swipeIdx==(i-1)}'
            :key='i'
            v-text='i'>
            </span>
        </div>
      </template>
    </van-swipe>

    <!-- 商品列表 -->
    <div class="qf-good">

      <div class="qf-good-title">
        <van-image
          class="qf-image"
          src="//img12.360buyimg.com/img/s750x70_jfs/t1/148857/1/16777/13220/5fc9f9d0E734c0ee5/88c99cdbe410e58a.png"
        />
      </div>

      <!-- 商品列表 -->
      <!-- immediate-check，关闭掉页面初始化时的触底检测 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check='false'
      >
        <div class="qf-good-row" v-for='i in n' :key='i'>
          <GoodItem :info='list[2*i-2]' />
          <GoodItem :info='list[2*i-1] || {} ' />
        </div>

      </van-list>
    </div>
  </van-pull-refresh>

  <QfTabbar />
</div>
</template>

<script>

import {
  NoticeBar,
  Swipe,
  SwipeItem,
  Lazyload,
  Image,
  List,
  PullRefresh
} from 'vant'
import Vue from 'vue'
Vue.use(Lazyload)

import { GoodItem, QfTabbar } from '@/components/'

export default {
  name: 'Home',
  components: {
    [NoticeBar.name]: NoticeBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    GoodItem,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    QfTabbar
  },
  data: function() {
    return {
      msg: '2021一起搞钱一起暴富2021一起搞钱一起暴富2021一起搞钱一起暴富',
      images: [],
      swipeIdx: 0,
      loading: false,
      finished: false,
      refreshing: false,
      list: [],   // 商品列表
      page: 1
    }
  },
  computed: {
    n: function() {
      return Math.ceil(this.list.length / 2)
    }
  },
  mounted() {
    // 请求第一页数据
    this.getList()
    this.$http.fetchAdList({}).then(res=>{
      this.images = res.list
    })
  },
  beforeDestroy() {
    console.log('首页将要被销毁')
  },
  methods: {
    // 把获取列表的方法封装一次
    getList() {
      const params = {
        size: 6,
        page: this.page
      }
      this.$http.fetchGoodList(params).then(res=>{
        console.log('成功', res)
        if(params.page===1) {
          // 当下拉刷新时，让page=1，重新请求数据库中最新的一页数据
          // 覆盖掉 this.list
          this.list = res.list
          this.finished = false
          this.refreshing = false
          // 解决“下拉刷新之后无法触底加载”的bug
          this.loading = false
        } else {
          // 当触底加载下一页数据时，我们将其合并到 this.list 中去
          this.list = [...this.list, ...res.list]
          this.loading = false
        }
        // 表示数据库已经被请求完了，不要再触发onLoad()方法
        if(this.list.length===res.total) {
          this.finished = true
          this.loading = true
        }
      })
    },
    noticeClose() {
      console.log('通知栏被关闭了')
    },
    swipeChange(idx) {
      this.swipeIdx = idx
    },
    // 下拉刷新
    onRefresh() {
      console.log('触发了下拉刷新')
      // 重置页面
      // 获取数据库商品列表的第一页数据
      this.page = 1
      this.getList()
      this.$http.fetchAdList({}).then(res=>{
        this.images = res.list
      })
    },
    // 当滚动条触底检测成功时，调用该方法
    onLoad() {
      console.log('触发了触低加载')
      // 获取数据库商品列表的下一页数据
      this.page++
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.qf-home {
  padding-bottom: 2rem;
  .qf-swipe-img {
    display: block;
    width: 100%;
    height: 4.13rem;
  }
  .van-swipe {
    position: relative;
    .qf-indicator {
      text-align: center;
      font-size: .16rem;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: .4rem;
      &>span {
        display: inline-block;
        width: .27rem;
        height: .27rem;
        margin: 0 .13rem;
        background-color: #F41206;
        border-radius: 50%;
        line-height: .27rem;
        text-align: center;
        color: white;
      }
      &>span.on {
        background-color: blue;
      }
    }
  }
  .qf-good-title {
    padding: .2rem 0;
  }
  .qf-good-row {
    display: flex;
    &>div {
      flex: 1;
      border: 1px solid #ccc;
    }
  }
}
</style>
