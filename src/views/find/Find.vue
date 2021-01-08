<template>
<div class="qf-find">
  <!-- 左侧 -->
  <div class="qff-left">
    <van-sidebar v-model="activeKey">
      <van-sidebar-item
        v-for='item in cateArr'
        :key='item._id'
        :title="item.cate_zh"
      />
    </van-sidebar>
  </div>

  <!-- 右侧 -->
  <div class="qff-right">
    <van-grid square column-num='3'>
      <van-grid-item
        v-for="item in goodObj[activeKey]"
        :key="item._id"
      >
        <template #icon>
          <div class="icon">
            <img :src="$img.url+item.img" alt="">
          </div>
        </template>
        <template #text>
          <div class="name" v-text='item.name'></div>
        </template>
      </van-grid-item>
    </van-grid>
  </div>

  <QfTabbar />
</div>
</template>

<script>

import { QfTabbar } from '@/components/'

import {
  Sidebar,
  SidebarItem,
  Grid,
  GridItem
} from 'vant'

import {
  mapActions,
  mapState,
  mapMutations
} from 'vuex'

export default {
  name: 'Find',
  components: {
    QfTabbar,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  data: function() {
    return {
      activeKey: 0,
      cateArr: [],
      goodList: []
    }
  },
  computed: {
    ...mapState('good', ['goodObj']),
    cateIndex() {
      return {
        index: this.activeKey,
        // 根据当前 activeKey 获取对应品类的英文字段
        cate: this.cateArr[this.activeKey].cate
      }
    }
  },
  watch: {
    activeKey() {
      const arr = this.goodObj[this.activeKey]
      // 实现缓存的做法
      // 每当用户触发改变cate时，我们首先要判断vuex中有没有当前品类对应的数据
      // 如果有，直接用它渲染视图
      // 如果没有，才调接口
      if(!(arr && arr.length>0)) {
        this.getGoodList(this.cateIndex)
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('good', ['getGoodList']),
    ...mapMutations('good', ['clearGoodObj']),
    async init() {
      let { list } = await this.$http.fetchAllCates({})
      this.cateArr = list
      // this.goodList = (await this.$http.fetchGoodList({cate: list[0].cate})).list
      // 我们要走状态管理
      // 在这里派发并触发actions方法
      this.getGoodList(this.cateIndex)
    }
  },
  beforeDestroy() {
    // 在离开Find页面时，要把Vuex中缓存数据清空掉
    // 提交并触发mutations方法
    this.clearGoodObj()
  }
}
</script>

<style lang="scss" scoped>
.qf-find {
  position: relative;
  width: 100%;
  height: 100%;
  .qff-left {
    position: absolute;
    top: 0;
    bottom: 1.33rem;
    left: 0;
    width: 2.13rem;
    overflow: auto;
  }
  .qff-right {
    position: absolute;
    top: 0;
    bottom: 1.33rem;
    left: 2.13rem;
    right: 0;
    overflow: auto;
    .icon {
      width: 1.87rem;
      height: 1.87rem;
      margin: 0 auto;
      &>img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .name {
      font-size: .35rem;
      text-align: center;
    }
  }
}
</style>
