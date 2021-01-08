<template>
<div class="qf-good-info">
  <img class="img" :src='$img.url+info.img' />
  <div class="info">
    <div v-text='info.name'></div>
    <div>价格：￥<span v-text='info.price'></span></div>
  </div>

  <van-goods-action>
    <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
    <van-goods-action-icon icon="cart-o" text="购物车" />
    <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
    <van-goods-action-button type="warning" text="加入购物车" />
    <van-goods-action-button type="danger" @click='addToCart'>
      <template #default>
        <div>我要败家</div>
      </template>
    </van-goods-action-button>
  </van-goods-action>

</div>
</template>

<script>

import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from 'vant'

export default {
  name: 'GoodInfo',
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      info: {}
    }
  },
  mounted() {
    // 在这里，根据 id调接口，获取商品完整的详情
    const id = this.id || this.$route.params.id
    this.$http.fetchGoodInfo({id}).then(res=>{
      console.log('商品详情', res)
      this.info = res
    })
  },
  methods: {
    // 添加购物车
    addToCart() {
      console.log('buy')
      // 首先判断用户是否已登录
      let token = localStorage.getItem('token')
      if(token) {
        // 如果已登录，直接调接口进行购买
        const data = {
          good_id: this.info._id
        }
        this.$http.fetchAddCart(data).then(()=>{
          console.log('购物成功')
          // 购买成功时，跳转到购物车页面
          this.$router.replace('/cart')
        })
      }else{
        // 如果没有登录，跳转登录页
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.qf-good-info {
  .img {
    display: block;
    width: 9.33rem;
    height: 9.33rem;
    margin: .33rem auto;
  }
  .info {
    font-size: .48rem;
    font-weight: bold;
    line-height: .93rem;
    box-sizing: border-box;
    padding: .33rem;
  }
}
</style>
