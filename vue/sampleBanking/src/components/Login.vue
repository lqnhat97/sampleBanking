<template>
  <div class="container">
    <h1 class="form-heading">INTERNET BANKING</h1>
    <div class="login-form">
      <div class="main-div">
        <div class="panel">
          <h2>ĐĂNG NHẬP</h2>
          <p>Vui lòng nhập tài khoản và mật khẩu</p>
        </div>
        <form id="Login">
          <div class="form-group">
            <input type="text" v-model="username" class="form-control" id="inputUserName" placeholder="Tài khoản" :class="{ 'is-invalid': submitted && !username }">
            <div v-show="submitted && !username" class="invalid-feedback">Yêu cầu nhập tài khoản!</div>
          </div>
          <div class="form-group">
            <input type="password" v-model="password" class="form-control" id="inputPassword" placeholder="Mật khẩu" :class="{ 'is-invalid': submitted && !password }" >
            <div v-show="submitted && !password" class="invalid-feedback">Yêu cầu nhập mật khẩu!</div>
          </div>
          <div class="g-recaptcha" data-sitekey="6LenKYcUAAAAAOIM9uXsEkZqt3k1lOsTzSaf7Iy8"></div>
            <div id="captcha_err" class="invalid-feedback">Yêu cầu nhập captcha!</div>
          <button type="submit" @click="checkCaptcha" class="btn btn-primary">Đăng nhập</button>
            <div id="login_err" class="invalid-feedback">Sai tên đăng nhập hoặc mật khẩu!</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        submitted: false
      }
    },
    methods: {
      checkCaptcha(e) {
        e.preventDefault();
        this.submitted = true;
        if (grecaptcha.getResponse() == "") {
          $("#captcha_err").show();
        } else {
          axios.post('http://192.168.0.181:8088/api/user',{
            role:1,
            userName:this.username,
            passwords:this.password
          }).then(user=>{
            console.log(user);
            if(user.data.refresh_token){
              localStorage.setItem('user', JSON.stringify(user));
              this.$router.replace('/home')
            }
            else{
              $("#login_err").show();
            }
          })
        }
      }
    },
  }
  require('@/assets/css/login.css')

</script>
