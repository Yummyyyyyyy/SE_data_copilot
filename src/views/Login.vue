<template>
    <div class="container container-custom">
      <h2>登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="loginEmail">邮箱</label>
          <input type="email" class="form-control" id="loginEmail" v-model="email" placeholder="输入邮箱" required>
        </div>
        <div class="form-group">
          <label for="loginPassword">密码</label>
          <input type="password" class="form-control" id="loginPassword" v-model="password" placeholder="输入密码" required>
        </div>
        <button type="submit" class="btn btn-primary">登录</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      handleLogin() {
        alert('登录成功');
        this.$router.push('/home');
      }
    }
  };
  </script>
  
  <style scoped>
  .container-custom {
    margin-top: 20px;
  }
  </style>
  