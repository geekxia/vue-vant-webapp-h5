<template>
<div class="app">

  <!-- 解决“首页保持浏览状态”的bug -->
  <keep-alive>
    <router-view name='alive'></router-view>
  </keep-alive>

  <router-view></router-view>

</div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
html, body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
}

// 解决购物车中的checkbox左右居中问题
.van-checkbox.qf-checkbox {
  // background-color: red;
  &>div {
    margin: 0 auto;
  }
}
</style>
