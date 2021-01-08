<template>
<div class="qf-good-item">
  <div v-if='info._id' @touchstart='skipToDetail'>
    <img class="img" :src='$img.url+info.img' />
    <div class="title" v-text='info.name'></div>
    <div class="info">
      <span v-text='"￥"+info.price'></span>
      <span>新品</span>
      <span>看相似</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  methods: {
    skipToDetail() {
      // 动态路由传参，从列表页跳转到详情页
      this.$router.push('/good/'+this.info._id)
    }
  }
}
</script>

<style lang="scss" scoped>
.qf-good-item {
  font-size: .35rem;
  .img {
    display: block;
    width: 4.6rem;
    height: 4.6rem;
    border-radius: .13rem;
    margin: 0 auto;
  }
  .title {
    line-height: .47rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin: .13rem 0;
    box-sizing: border-box;
    padding: 0 .27rem;
  }
  .info {
    line-height: .47rem;
    height: .47rem;
    overflow: hidden;
    margin: .27rem;
    &>span:nth-child(1) {
      float: left;
      color: red;
      font-weight: bold;
    }
    &>span:nth-child(2) {
      float: left;
      margin-left: .27rem;
      border: .03rem solid #ccc;
      font-size: .27rem;
      height: .4rem;
      line-height: .35rem;
      padding: 0 .07rem;
      border-radius: .04rem;
    }
    &>span:nth-child(3) {
      float: right;
      font-size: .27rem;
      line-height: .4rem;
      padding: 0 .07rem;
      background: rgba(240, 242, 245, 1);
      border-radius: .2rem;
    }
  }
}
</style>
