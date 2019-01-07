<template>
  <div class="subContainer">
    <form class="form-horizontal" role="form">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <h2>Tạo tài khoản</h2>
          <hr>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 field-label-responsive">
          <label for="name">Tên đăng nhập</label>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <div class="input-group mb-2 mr-sm-2 mb-sm-0">
              <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-user"></i></div>
              <input type="text" name="name" class="form-control" id="name" v-model="username" placeholder="John Doe"
                required autofocus>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-control-feedback">
            <span class="text-danger align-middle">
              <!-- Put name validation error messages here -->
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 field-label-responsive">
          <label for="email">EMail</label>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <div class="input-group mb-2 mr-sm-2 mb-sm-0">
              <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-at"></i></div>
              <input type="text" name="email" class="form-control" id="email" v-model="email" placeholder="you@example.com"
                required autofocus>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-control-feedback">
            <span class="text-danger align-middle">
              <!-- Put e-mail validation error messages here -->
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 field-label-responsive">
          <label for="phone">Điện thoại</label>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <div class="input-group mb-2 mr-sm-2 mb-sm-0">
              <div class="input-group-addon" style="width: 2.6rem">
                <i class="fa fa-repeat"></i>
              </div>
              <input type="phone" name="phone" class="form-control" id="password-confirm" placeholder="PhoneNumber"
                v-model="phone" required>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 field-label-responsive">
          <label for="password">Mật khẩu</label>
        </div>
        <div class="col-md-6">
          <div class="form-group has-danger">
            <div class="input-group mb-2 mr-sm-2 mb-sm-0">
              <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-key"></i></div>
              <input type="password" name="password" class="form-control" id="password" v-model="password" placeholder="Password"
                required>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-control-feedback">
            <span class="text-danger align-middle">
              <!--    <i class="fa fa-close"> Example Error Message</i>-->
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <button type="submit" @click="createAccount" class="btn btn-success"><i class="fa fa-user-plus"></i>Tạo</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

  export default {
    data() {
      return {
        username: '',
        password: '',
        phone: '',
        email: ''
      }
    },
    methods:{
      createAccount(e){
        e.preventDefault();    
        axios({
        method: 'POST',
        headers: {
        'x-access-token': JSON.parse(localStorage.getItem("user")).data.access_token,
        'Content-Type': 'application/json'
        },
        url: 'http://192.168.0.142:8088/api/account/createAccount',
        data:{
          userName:this.username,
          passwords:this.password,
          email:this.email,
          cmnd:1321,
          dienthoai:this.phone
        }
        }).then(value=>{
          alert("Tạo tài khoản thành công");

      })
      }
    }
  }
  require('@/assets/css/subPage.css')
</script>