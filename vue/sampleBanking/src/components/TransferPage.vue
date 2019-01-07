<template>
  <div class="subContainer">
    <div class="contact-image">
      <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact" />
    </div>
      <h3>Chuyển khoản</h3>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <input type="number" v-model="stkNhan" @change="findInfo" name="txtSTT" class="form-control" placeholder="Số tài khoản *"
              value="" />
          </div>
          <div class="form-group">
            <input type="number" v-model="soTien" name="txtTien" class="form-control" placeholder="Số tiền" value="" />
          </div>
          <div class="form-group">
            <input type="text" name="txtNoidung" v-model="content" class="form-control" placeholder="Nội dung chuyển khoản" value="" />
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
            <p data-placement="top" data-toggle="tooltip" title="Add"><button class="btn btn-primary" data-title="Add" 
            data-toggle="modal" data-target="#transfer" @click="sendOTP">Chuyển khoản</button></p>
          </div>
        </div>
      </div>
      <div class="modal fade" id="transfer" tabindex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove"
                aria-hidden="true"></span></button>
            <h4 class="modal-title custom_align" id="Heading">Nhập OTP</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input class="form-control" v-model="optValue" type="text" placeholder="OTP">
            </div>
          </div>
          <div class="modal-footer ">
            <button type="button"  class="btn btn-warning btn-lg" @click="transferDKM" style="width: 100%;"><span class="glyphicon glyphicon-ok-sign"></span>Chuyển khoản</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
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
        dienthoai:'',
        optValue:'',
        soTien:'',
        content:''
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
    methods: {
      test() {
        console.log(this.stkNhan);
      },
      findInfo() {
        axios({
          method: 'get',
          headers: {
            'x-access-token': JSON.parse(localStorage.getItem("user")).data.access_token,
            'Content-Type': 'application/json'
          },
          url: 'http://192.168.0.142:8088/api/paymentAccount/InfoByStk?soTaiKhoan=' + this.stkNhan,
        }).then(value => {
          this.userName = value.data[0].userName;
          this.email = value.data[0].email;
          this.dienthoai = value.data[0].dienthoai;
        })
      },
      sendOTP(){
        axios({
          method: 'post',
          headers: {
          'x-access-token': JSON.parse(localStorage.getItem("user")).data.access_token,
          'Content-Type': 'application/json'
          },
          url: 'http://192.168.0.142:8088/api/otpmail/sendOtpMail',
          data:{
            userName:JSON.parse(localStorage.getItem("user")).data.user.userName,
            email:JSON.parse(localStorage.getItem("user")).data.user.email,
          }
          }).then(value=>{
            this.userName=value.data[0].userName;
            this.email=value.data[0].email;
            this.dienthoai=value.data[0].dienthoai;
        })
      },
      transferDKM(){
        axios({
          method: 'post',
          headers: {
          'x-access-token': JSON.parse(localStorage.getItem("user")).data.access_token,
          'Content-Type': 'application/json'
          },
          url: 'http://192.168.0.142:8088/api/otpmail/checkOtp',
          data:{
            userName:JSON.parse(localStorage.getItem("user")).data.user.userName,
            token:this.optValue,
          }
          }).then(value=>{
            console.log(value);
            if(value.status == 200){
              axios({
                method: 'post',
                headers: {
                'x-access-token': JSON.parse(localStorage.getItem("user")).data.access_token,
                'Content-Type': 'application/json'
                },
                url: 'http://192.168.0.142:8088/api/transfer/internal',
                data:{
                  SoTaiKhoanGui:this.stk,
                  SoTaiKhoanNhan:this.stkNhan,
                  amount:this.soTien,
                  transactionFee:1000,
                  content:this.content,
                  idBank:777,
                  typeFee:0
                }
              }).then(()=>{
                alert('Đã chuyển tiền');
              })
            }
            else{
              alert("Sai OTP hoặc OTP hết hạn");
            }
        })
      }
    }
  }
  require('@/assets/css/transfer.css')
</script>