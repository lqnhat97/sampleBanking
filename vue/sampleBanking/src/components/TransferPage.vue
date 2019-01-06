<template>
  <div class="subContainer">
    <div class="contact-image">
      <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact" />
    </div>
    <form>
      <h3>Chuyển khoản</h3>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <input type="number" v-model="stkNhan" @change="findInfo" name="txtSTT" class="form-control" placeholder="Số tài khoản *" value="" />
          </div>
          <div class="form-group">
            <input type="number" name="txtTien" class="form-control" placeholder="Số tiền" value="" />
          </div>
          <div class="form-group">
            <input type="text" name="txtNoidung" class="form-control" placeholder="Nội dung chuyển khoản" value="" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input name="txtName" class="form-control" placeholder="Người nhận" v-model="userName" readonly>
          </div>
          <div class="form-group">
            <input name="txtMail" class="form-control" v-model="email" placeholder="Email" readonly>
          </div>
          <div class="form-group">
            <input name="txtSDT" class="form-control" v-model="dienthoai" placeholder="Số điện thoại" readonly>
          </div>
                    <div class="form-group">
            <input type="submit" name="btnSubmit" class="btn btn-success" value="Chuyển khoản" />
          </div>
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
        stkNhan:'',
        userName:'',
        email:'',
        dienthoai:''
      }
    },
    props: {
      stk: {
        type: String,
        required: false
      },
      sodu: {
        type: Number,
        required: false
      }
    },
    methods:{
      test(){
        console.log(this.stkNhan);
      },
      findInfo(){
        axios({
          method: 'get',
          headers: {
          'x-access-token': JSON.parse(localStorage.getItem("user")).data.access_token,
          'Content-Type': 'application/json'
          },
          url: 'http://192.168.0.142:8088/api/paymentAccount/InfoByStk?soTaiKhoan='+this.stkNhan,
          }).then(value=>{
            this.userName=value.data[0].userName;
            this.email=value.data[0].email;
            this.dienthoai=value.data[0].dienthoai;
        })
      }
    }
  }
  require('@/assets/css/transfer.css')
</script>