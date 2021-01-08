<template>
<div class="qf-login">
  <h1>登录页</h1>

  <van-form @submit="onLogin">
    <van-field
      v-model="user.username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="user.password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">立即登录</van-button>
    </div>
  </van-form>
  <div>
    <span>如果没有账号？</span>
    <span @click='skipToRegist'>点击注册</span>
  </div>

</div>
</template>

<script>

import {
  Form,
  Field,
  Button,
  Toast
} from 'vant'

export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data: function() {
    return {
      user: {
        username: '',
        password: ''
      },
      timer: null
    }
  },
  methods: {
    skipToRegist() {
      console.log('998988998')
      this.$router.push('/regist')
    },
    onLogin() {
      console.log('登录提交')
      this.$http.fetchLogin(this.user).then(res=>{
        Toast.success('登录成功', res)
        // 把token存储到本地
        localStorage.setItem('token', res.token)
        this.timer = setTimeout(()=>{
          this.$router.back()
        }, 2000)
      })
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="scss" scoped>
</style>
