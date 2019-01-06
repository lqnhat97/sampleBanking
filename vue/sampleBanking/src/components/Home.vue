<template>
  <div class="container">
    <div class="header">
      <h1>InternetBanking</h1>
    </div>
    <div v-if="id != null">
      <div>
        <div class="righttopnav">
          <div class="form-row align-items-center" style="float:right;">
            <div class="col-auto my-1">
              <select v-model="selected" v-on:change="onChangeSTK" aria-placeholder="Tài khoản thanh toán" class="custom-select mr-sm-2">
                <option v-for="payAccount in payAccounts" v-bind:key="payAccount.soTaiKhoan" v-bind:value="payAccount.soTaiKhoan">
                  {{payAccount.soTaiKhoan}}
                </option>
              </select>
            </div>
            <button type="button" class="btn btn-link" v-on:click="logOut" style="float:right;">Đăng xuất</button>
          </div>
          <div style="float:right;">
            <p>Xin chào <span style="color:red">{{userName}}</span></p>
          </div>
        </div>

        <div class="lefttopnav">
          <router-link v-show="role == 0"  to="/home">
            <span v-on:click="goHome">Home</span>
          </router-link>
          <router-link v-show="role == 0"  to="/home">
            <span v-on:click="goTransfer">Chuyển khoản</span>
          </router-link>
          <router-link v-show="role == 0"  to="/home">
            <span v-on:click="goHistory">Lịch Sử</span>
          </router-link>
          <router-link v-show="role == 0"  to="/home">
            <span v-on:click="goDirectory">Danh bạ</span>
          </router-link>
          <router-link v-show="role == 0"  to="/home">
            <span v-on:click="goClose">Đóng tài khoản</span>
          </router-link>
          <router-link v-show="role == 1"  to="/home">
            <span v-on:click="goCreAcc">Tạo tài khoản</span>
          </router-link>
          <router-link v-show="role == 1"  to="/home">
            <span v-on:click="goCrePayAcc">Tạo tài khoản thanh toán</span>
          </router-link>
          <router-link v-show="role == 1"  to="/home">
            <span v-on:click="goRecharge">Nạp tiền</span>
          </router-link>
          <router-link v-show="role == 2" to="/home">
            Truy vấn ví
          </router-link>
        </div>
      </div>
      <div v-if="selected != ''">
        <home-page v-if="activeTab == 1" :stk="payAccount.soTaiKhoan" :sodu="payAccount.soDu">
        </home-page>
        <history-page v-if="activeTab == 2" :stk="payAccount.soTaiKhoan">
        </history-page>
        <transfer-page v-if="activeTab == 4" :stk="payAccount.soTaiKhoan" :sodu="payAccount.soDu">
        </transfer-page>
        <directory-page v-if="activeTab == 3" :id="id">
        </directory-page>
      </div>
      <div v-else>
        <hello-page></hello-page>
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

import homePageCpn from './HomePage.vue';
import helloPageCpn from './HelloPage.vue';
import transferPageCpn from './TransferPage.vue';
import directoryPageCpn from './DirectoryPage.vue';
import historyPageCpn from './HistoryPage.vue';

  export default {
    name: 'home',
    data() {
      return {
        role: JSON.parse(localStorage.getItem("user")).data.role,
        id: JSON.parse(localStorage.getItem("user")).data.id,
        payAccounts: JSON.parse(localStorage.getItem("user")).data.paymentAccount,
        userName: JSON.parse(localStorage.getItem("user")).data.user.userName,
        payAccount: {},
        selected:'',
        activeTab: 1,
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
        this.activeTab = 1
      },
      goHistory() {
        if(this.selected != '')
          this.activeTab = 2
        else
          alert("Vui lòng chọn tài khoản thanh toán!")
      },
      goDirectory() {
        this.activeTab = 3
      },
      goTransfer() {
        if(this.selected != '')
        {
          alert("a");
          this.activeTab = 4
        }
          
        else
          alert("Vui lòng chọn tài khoản thanh toán!")
      },
      goClose() {
        if(this.selected != '')
        
          this.activeTab = 5
        else
          alert("Vui lòng chọn tài khoản thanh toán!")
      },
      goCreAcc() {
        this.activeTab = 1
      },
      goCrePayAcc(){
        this.activeTab = 2
      },
      goRecharge(){
        this.activeTab = 3
      }
    },

    components: {
        homePage: homePageCpn,
        helloPage: helloPageCpn,
        directoryPage: directoryPageCpn,
        historyPage: historyPageCpn,
        transferPage: transferPageCpn
    }
  }
  require('@/assets/css/home.css')
</script>