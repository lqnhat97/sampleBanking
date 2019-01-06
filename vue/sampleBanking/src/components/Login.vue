<template>
  <div class="container">
    <h1 class="form-heading">login Form</h1>
    <div class="login-form">
      <div class="main-div">
        <div class="panel">
          <h2>INTERNET BANKING</h2>
          <p>Vui lòng nhập tài khoản và mật khẩu</p>
        </div>
        <form id="Login">
          <div class="form-group">
            <input type="text" class="form-control" id="inputUserName" placeholder="Tài khoản">
            <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="inputPassword" placeholder="Mật khẩu">
            <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
          </div>
          <div class="g-recaptcha" data-sitekey="6LenKYcUAAAAAOIM9uXsEkZqt3k1lOsTzSaf7Iy8"></div>
          <button type="submit" @click="checkCaptcha" class="btn btn-primary">Đăng nhập</button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
        if (grecaptcha.getResponse() == "") {
          alert("You can't proceed!");
        } else {
          alert("Thank you");
        }
      }
    }
  }
  require('@/assets/css/login.css')

</script>
