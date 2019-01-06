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
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="inputPassword" placeholder="Mật khẩu"> 
          </div>
          <div class="g-recaptcha" data-sitekey="6LenKYcUAAAAAOIM9uXsEkZqt3k1lOsTzSaf7Iy8"></div>
          <button type="submit" class="btn btn-primary">Đăng nhập</button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

</style>
<script>
 
require('@/assets/css/login.css')

</script>
