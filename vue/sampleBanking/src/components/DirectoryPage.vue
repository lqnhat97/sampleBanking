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
                <tr v-for="el in directory" v-bind:key="el.stkElementUser">
                  <td @click="idBiXoa = el.stkElementUser">{{el.stkElementUser}}</td>
                  <td>{{el.elementUserName}}</td>
                  <td>{{(el.idBank==777)?'iBank':((el.idBank==999)?'NBank':'PPNBank')}}</td>
                  <td>
                    <p data-placement="top" data-toggle="tooltip" title="Edit"><button  class="btn btn-primary btn-xs"
                        data-title="Edit" data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></p>
                  </td>
                  <td>
                    <p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs"
                        data-title="Delete" data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></span></button></p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p data-placement="top" data-toggle="tooltip" title="Add"><button class="btn btn-primary" data-title="Add" 
            data-toggle="modal" data-target="#add">Thêm danh bạ</button>
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
            <h4 class="modal-title custom_align" id="Heading">Chỉnh sửa danh bạ</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input class="form-control" v-model="elementUserName" type="text" placeholder="Tên">
            </div>
          </div>
          <div class="modal-footer ">
            <button type="button" @click="changeName" class="btn btn-warning btn-lg" style="width: 100%;"><span class="glyphicon glyphicon-ok-sign"></span> Update</button>
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

            <div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Bạn có muốn xóa không?</div>

          </div>
          <div class="modal-footer ">
            <button type="button" @click="deleteDirectory" class="btn btn-success"><span class="glyphicon glyphicon-ok-sign"></span>Có</button>
            <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span>Không</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <div class="modal fade" id="add" tabindex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove"
                aria-hidden="true"></span></button>
            <h4 class="modal-title custom_align" id="Heading">Thêm danh bạ</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input class="form-control" v-model="addStk" type="number" placeholder="Số tài khoản">
            </div>
            <div class="form-group">
              <input class="form-control" v-model="addUserName" type="text" placeholder="Tên">
            </div>
          </div>
          <div class="modal-footer ">
            <button type="button" @click="addDirectory" class="btn btn-warning btn-lg" style="width: 100%;"><span class="glyphicon glyphicon-ok-sign"></span>Thêm</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <input v-model="idBiXoa" hidden>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data(){
      return{
        directory:'',
        elementUserName:'',
        addUserName:'',
        addStk:'',
        idBiXoa:''
      }
    },
    props: {
      id: {
        type: Number,
        required: false
      }
    },
    methods:{
      changeName(e){
        console.log()
        e.preventDefault();
        axios({
        method: 'POST',
        headers: {
        'x-access-token': JSON.parse(localStorage.getItem("user")).data.access_token,
        'Content-Type': 'application/json'
        },
        url: 'http://192.168.0.142:8088/api/directory/updateDirectory',
        data:{
          elementUserName:this.elementUserName,
          idRootUser:this.id,
          stkElementUser:this.idBiXoa
        }
        }).then(value=>{
          
      })
      },
    deleteDirectory(e){
      console.log(this.idBiXoa);
        e.preventDefault();
        axios({
        method: 'POST',
        headers: {
        'x-access-token': JSON.parse(localStorage.getItem("user")).data.access_token,
        'Content-Type': 'application/json'
        },
        url: 'http://192.168.0.142:8088/api/directory/deleteDirectory',
        data:{
          stkElementUser:this.idBiXoa,
          idRootUser:this.id
        }
        }).then(value=>{
          console.log(value);

      })
      },
      addDirectory(e){
        e.preventDefault();
        axios({
        method: 'POST',
        headers: {
        'x-access-token': JSON.parse(localStorage.getItem("user")).data.access_token,
        'Content-Type': 'application/json'
        },
        url: 'http://192.168.0.142:8088/api/directory/createDirectory',
        data:{
          idRootUser:this.id,
          idBank:777,
          stkElementUser:this.addStk,
          elementUserName:this.addUserName
        }
        }).then(value=>{
          console.log(value);

      })
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