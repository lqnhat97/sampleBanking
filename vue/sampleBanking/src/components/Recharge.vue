<template>
  <div class="subContainer">
   <form class="form-horizontal" role="form">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <h2>Nạp tiền</h2>
          <hr>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 field-label-responsive">
          <label for="stk">Số tài khoản</label>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <div class="input-group mb-2 mr-sm-2 mb-sm-0">
              <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-user"></i></div>
              <input type="number" name="name" class="form-control" id="stk" v-model="sotaikhoan" required autofocus>
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
          <label for="sotien">Số tiền</label>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <div class="input-group mb-2 mr-sm-2 mb-sm-0">
              <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-at"></i></div>
              <input type="number" name="sotien" class="form-control" id="sotien" v-model="money" required autofocus>
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
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <button type="submit" @click="naptien" class="btn btn-success"><i class="fa fa-user-plus"></i>Nạp</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

  export default {
    data(){
      return{
        sotaikhoan:'',
        money:''
      }
    },methods:{
      naptien(e){
        e.preventDefault();    
        axios({
        method: 'PUT',
        headers: {
        'x-access-token': JSON.parse(localStorage.getItem("user")).data.access_token,
        'Content-Type': 'application/json'
        },
        url: 'http://192.168.0.142:8088/api/paymentAccount/recharge',
        data:{
          soTaiKhoan:this.sotaikhoan,
          amount:this.money
        }
        }).then(value=>{
          alert("Nạp tiền thành công");
        })
      }
    }
  }
  require('@/assets/css/subPage.css')
</script>