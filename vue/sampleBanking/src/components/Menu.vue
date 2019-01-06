<template>
  <div class="topnav">
    <router-link v-show="role == 0" to="/home">Home</router-link>
    <router-link v-show="role == 0" to="/home">Lịch Sử</router-link>
    <router-link v-show="role == 0" to="/home">Danh bạ</router-link>
    <router-link v-show="role == 0" to="/home">Tài khoản thanh toán</router-link>
    <router-link v-show="role == 0" to="/home">Đóng tài khoản</router-link>
    <router-link v-show="role == 1" to="/home">Tạo tài khoản</router-link>
    <router-link v-show="role == 1" to="/home">Tạo tài khoản thanh toán</router-link>
    <router-link v-show="role == 1" to="/home">Nạp tiền</router-link>
    <router-link v-show="role == 2" to="/home">Truy vấn ví</router-link> -->
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        role : 0
      };
    }
  }
  require('@/assets/css/menu.css')
</script>