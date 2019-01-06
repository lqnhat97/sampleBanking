<template>
  <div class="subContainer">
    <div>
      <div class="row">
        <div class="col-md-12">
          <h4>Danh bạ</h4>
          <div class="table-responsive">
            <table id="mytable" class="table table-bordred table-striped">
              <thead>
                <th>Số tài khoản</th>
                <th>Tên</th>
                <th>Ngân hàng</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </thead>
              <tbody>
                <tr v-for="el in directory" v-bind:key="el.idRootUser">
                  <td>{{el.stkElementUser}}</td>
                  <td>{{el.elementUserName}}</td>
                  <td>{{(el.idBank==777)?'iBank':((el.idBank==999)?'NBank':'PPNBank')}}</td>
                  <td>
                    <p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs"
                        data-title="Edit" data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></p>
                  </td>
                  <td>
                    <p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs"
                        data-title="Delete" data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></span></button></p>
                  </td>
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
    data(){
      return{
        directory:''
      }
    },
    props: {
      id: {
        type: Number,
        required: false
      }
    },
    created(){
      axios({
        method: 'get',
        headers: {
        'x-access-token': JSON.parse(localStorage.getItem("user")).data.access_token,
        'Content-Type': 'application/json'
        },
        url: 'http://192.168.0.142:8088/api/directory/getDirectoryById?id='+this.id
        }).then(value=>{
          this.directory = value.data;
          console.log(this.directory);

      })
    }
  }
  require('@/assets/css/subPage.css')
</script>