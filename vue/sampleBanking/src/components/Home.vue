<template>
  <div class="container">
    <div class="header">
      <h1>InternetBanking</h1>
    </div>
    <div class="topnav">
      <router-link v-show="role == 0" to="/home">
        Home
      </router-link>
      <router-link v-show="role == 0" to="/home">
        Lịch Sử
      </router-link>
      <router-link v-show="role == 0" to="/home">
        Danh bạ
      </router-link>
      <router-link v-show="role == 0" to="/home">
        Tài khoản thanh toán
      </router-link>
      <router-link v-show="role == 0" to="/home">
        Đóng tài khoản
      </router-link>
      <router-link v-show="role == 1" to="/home">
        Tạo tài khoản
      </router-link>
      <router-link v-show="role == 1" to="/home">
        Tạo tài khoản thanh toán
      </router-link>
      <router-link v-show="role == 1" to="/home">
        Nạp tiền
      </router-link>
      <router-link v-show="role == 2" to="/home">
        Truy vấn ví
      </router-link>
      <router-link @click="logOut" to="/">
        <span v-on:click="logOut">Đăng xuất</span>
      </router-link>
    </div>

    <router-view />
  </div>

</template>



<script>
  export default {
    name: 'home',
    data() {
      return {
        role: JSON.parse(localStorage.getItem("user")).data.role
      }
    },
    methods:{
      logOut(){
        localStorage.removeItem("user");
      }
    },
    
  }
  require('@/assets/css/home.css')
</script>
