<template>
  <div class="subContainer">
    <div>
      <div class="row">
        <div class="col-md-12">
          <h4>Lịch sử giao dịch</h4>
          <div class="table-responsive">
            <table id="mytable" class="table table-bordred table-striped">
              <thead>
                <th>Số tài khoản gửi</th>
                <th>Số tài khoản nhận</th>
                <th>Thời gian</th>
                <th>Số tiền</th>
                <th>Phí tổn</th>
                <th>Nội dung chuyển</th>
                <th>Loại phí chuyển tiền</th>
              </thead>  
              <tbody>
                <tr v-for="el in history" v-bind:key="el.idHistory">
                  <td>{{el.stkSenter}}</td>
                  <td>{{el.stkReceiver}}</td>
                  <td>{{el.tradingTime}}</td>
                  <td>{{el.amount}}</td>
                  <td>{{el.transactionFee}}</td>
                  <td>{{el.content}}</td>
                  <td>{{(el.typeFee)?'SenterPay':'ReceiverPay'}}</td>
                </tr>
              </tbody>
            </table>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove"
                aria-hidden="true"></span></button>
            <h4 class="modal-title custom_align" id="Heading">Edit Your Detail</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input class="form-control " type="text" placeholder="Mohsin">
            </div>
            <div class="form-group">

              <input class="form-control " type="text" placeholder="Irshad">
            </div>
            <div class="form-group">
              <textarea rows="2" class="form-control" placeholder="CB 106/107 Street # 11 Wah Cantt Islamabad Pakistan"></textarea>


            </div>
          </div>
          <div class="modal-footer ">
            <button type="button" class="btn btn-warning btn-lg" style="width: 100%;"><span class="glyphicon glyphicon-ok-sign"></span> Update</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <div class="modal fade" id="delete" tabindex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove"
                aria-hidden="true"></span></button>
            <h4 class="modal-title custom_align" id="Heading">Delete this entry</h4>
          </div>
          <div class="modal-body">

            <div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Are you sure you
              want to delete this Record?</div>

          </div>
          <div class="modal-footer ">
            <button type="button" class="btn btn-success"><span class="glyphicon glyphicon-ok-sign"></span> Yes</button>
            <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> No</button>
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
    data() {
      return {
        history:'',
        sotaikhoan:''
      }
    },
    props: {
      stk: {
        type: String,
        required: false
      }
    },
    created() {
      axios({
        method: 'get',
        headers: {
        'x-access-token': JSON.parse(localStorage.getItem("user")).data.access_token,
        'Content-Type': 'application/json'
        },
        url: 'http://192.168.0.142:8088/api/history/historyBySoTaiKhoan?soTaiKhoan='+this.stk
        }).then(value=>{
          this.history = value.data;
          console.log(this.history);

      })
    }
  }
  require('@/assets/css/subPage.css')
  $(document).ready(function(){
    $("#mytable #checkall").click(function () {
      if ($("#mytable #checkall").is(':checked')) {
        $("#mytable input[type=checkbox]").each(function () {
          $(this).prop("checked", true);
        });
      } else {
        $("#mytable input[type=checkbox]").each(function () {
          $(this).prop("checked", false);
        });
      }
    });
      
  $("[data-toggle=tooltip]").tooltip();
  });
</script>
