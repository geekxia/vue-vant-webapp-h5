<template>
<div class="qf-cart">

  <van-nav-bar
    title="购物车"
    left-text="返回"
    @click-left='back'
    left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>


  <div class='null' v-if='showNull'>
    <img :src="$img.NullCart" alt="" />
    <div>暂无商品</div>
  </div>
  <van-swipe-cell v-show='list.length>0' v-for='(item,index) in list' :key='item._id'>
    <!-- 一行 -->
    <van-row type='flex' align='center'>
      <!-- 左列 -->
      <van-col span='4'>
        <van-checkbox
          class="qf-checkbox"
          v-model="item.checked"
          @click="rowClick"
        />
      </van-col>
      <!-- 右列 -->
      <van-col span='20'>
        <van-card
          :num="item.num"
          :price="item.good && item.good.price"
          :desc="item.good && item.good.desc"
          :title="item.good && item.good.name"
          class="goods-card"
          :thumb="item.good && ($img.url+item.good.img)"
        >
          <template #footer>
            <div class="btns">
              <span @touchstart='update(item,index,-1)'> - </span>
              <span @touchstart='update(item,index,1)'> + </span>
            </div>
          </template>
        </van-card>
      </van-col>
    </van-row>

    <template #right>
      <van-button
        square
        text="删除"
        type="danger"
        class="delete-button"
        @touchstart='remove(item,index)'
      />
    </template>
  </van-swipe-cell>

  <!-- 提交 -->
  <van-submit-bar
    :price="total"
    button-text="提交订单"
    @submit="onSubmit">
    <van-checkbox
      v-model="full"
      @click='fullClick'>
      全选
    </van-checkbox>
    <template #tip>
      你的收货地址不支持同城送, <span @click="onEditAddr">修改地址</span>
    </template>
  </van-submit-bar>

</div>
</template>

<script>

import {
  SubmitBar,
  Checkbox,
  NavBar,
  Icon,
  SwipeCell,
  Card,
  Button,
  Col,
  Row,
  Dialog,
  Toast
} from 'vant'
export default {
  name: 'Cart',
  components: {
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [SwipeCell.name]: SwipeCell,
    [Card.name]: Card,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col
  },
  data: function() {
    return {
      full: false,  // 控制“全选”的那个checkbox
      list: [],      // 购物车商品列表
      showNull: false
    }
  },
  computed: {
    total() {
      let t = 0
      this.list.map(ele=>{
        if(ele.checked) t += ele.num*ele.good.price
      })
      return t*100 // 单位是“分”
    }
  },
  // watch: {
  //   list() {
  //     let t = 0
  //     this.list.map(ele=>{
  //       if(ele.checked) t += ele.num*ele.good.price
  //     })
  //     this.total = t*100
  //   }
  // },
  mounted() {
    // 购物车页面初始化调接口
    this.init()
  },
  methods: {
    init() {
      this.$http.fetchCartList({}).then(res=>{
        console.log('购物车列表', res)
        this.list = res
        this.showNull = !(res.length>0)
        // 解决"提交全部购物车商品时，checkbox仍然是选中状态"的bug
        this.full = !(res.length>=0)
      })
    },
    back() {
      this.$router.back()
    },
    // 当点击“全选按钮”时
    fullClick() {
      console.log('full', this.full)
      const arr = this.list
      arr.map((ele,idx)=>{
        arr[idx].checked = this.full
      })
      console.log('arr', arr)
      // 深复制
      this.list = JSON.parse(JSON.stringify(arr))
      // 强制执行diff运算，更新视图
      // this.$forceUpdate()
    },
    // 当点击第一行的Checkbox时
    rowClick() {
      // 每次切换行的选中状态时，都要检测被选中的商品数量是否与list总长度相等
      const arr = this.list.filter(ele=>ele.checked)
      this.full = (arr.length === this.list.length)
    },
    remove(item,index) {
      // 先弹框，用户确认后才能删除
      Dialog.confirm({
        title: '警告',
        message: `你确定要删除 ${item.good.name} 吗？`,
      }).then(() => {
        this.$http.fetchDelCart({id: item._id}).then(()=>{
          console.log('删除成功')
          // this.init()
          this.list.splice(index, 1)
          // 修复“删除操作不出现暂无商品”的bug
          if(this.list.length===0) this.showNull = true
        })
      }).catch(() => {})
    },
    update(item,index,step) {
      const data = {
        id: item._id,
        num: item.num + step
      }
      if(data.num===0) return Toast('商品数据不能小于1')
      this.$http.fetchUpdCart(data).then(()=>{
        // this.init()
        this.list[index].num = data.num
      })
    },
    onSubmit() {
      console.log('提交订单')
      let goods = ''
      this.list.map(ele=>{
        if(ele.checked) goods += (';'+ele._id)
      })
      if(!goods) return Toast('请选择你要提交的商品')
      this.$http.fetchSubmit({goods}).then(()=>{
        this.init()
      })
    },
    onEditAddr() {
      console.log('你点击了修改地址')
    }
  }
}
</script>

<style lang="scss" scoped>
.qf-cart {
  padding-bottom: 2.67rem;
  .null {
    text-align: center;
    padding: .33rem 0;
    font-size: .53rem;
    line-height: .67rem;
    color: #999999;
    img {
      display: inline-block;
      width: 4rem;
      height: 4rem;
    }
  }
  .delete-button {
    height: 100%;
  }
  .btns {
    span {
      display: inline-block;
      padding: 0 .2rem;
      border:  1px solid #ccc;
      border-radius: .04rem;
      box-sizing: border-box;
      line-height: .4rem;
      height: .43rem;
      font-size: .32rem;
      color: #ccc;
    }
    span:last-child {
      margin-left: .27rem;
    }
  }
  .van-card {
    background-color: white;
    // border-bottom: 1px solid #eee;
    padding-left: 0;
  }
  .van-swipe-cell {
    border-bottom: 1px solid #eee;
  }
}

.test {
  font-size: .4rem;
  text-align: center;
  border: 1px solid #ccc;
}


</style>
