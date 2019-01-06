<template>
  <div class="container">
    <div class="header">
      <h1>InternetBanking</h1>
    </div>
    <div v-if="id != null">
      <div>
        <div class="righttopnav">
          <router-link to="/">
            <span v-on:click="logOut">Đăng xuất</span>
          </router-link>
          <router-link v-show="role == 0" to="/home">
            <select v-model="selected" v-on:change="onChangeSTK" aria-placeholder="Tài khoản thanh toán">
              <option v-for="payAccount in payAccounts" v-bind:key="payAccount.soTaiKhoan" v-bind:value="payAccount.soTaiKhoan" selected>
                {{payAccount.soTaiKhoan}}
              </option>
            </select>
          </router-link> 
          <router-link to="/home" aria-disabled="false">
            Xin chào <span style="color:red">{{userName}}</span>
          </router-link>
        </div>

        <div class="lefttopnav">
          <router-link v-show="role == 0" v-on:click="goHome" to="/home">
            Home
          </router-link>
          <router-link v-show="role == 0" to="/home">
            Lịch Sử
          </router-link>
          <router-link v-show="role == 0" to="/home">
            Danh bạ
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
        </div>
      </div>
      <div id="tabcontain">
      </div>
    </div>

    <div v-else>
      <h5>
        <i class="fa fa-align-center">Error! Please
          <router-link to="/">
            login!
          </router-link>
        </i>
      </h5>
    </div>

    <router-view />
  </div>

</template>



<script>
  export default {
    name: 'home',
    data() {
      return {
        role: JSON.parse(localStorage.getItem("user")).data.role,
        id: JSON.parse(localStorage.getItem("user")).data.id,
        payAccounts: JSON.parse(localStorage.getItem("user")).data.paymentAccount,
        userName: JSON.parse(localStorage.getItem("user")).data.user.userName,
        payAccount: {},
        activeTab: "Home",
      }
    },

    methods: {
      logOut() {
        localStorage.removeItem("user");
      },
      onChangeSTK() {
        this.payAccounts.forEach(element => {
          if (element.soTaiKhoan == this.selected) {
            this.payAccount = element;
            return;
          }
        });
      },
      goHome() {
          
      }
    },
  }
  require('@/assets/css/home.css')
</script>