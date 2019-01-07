<template>
  <div class="subContainer">
   <div class="table-responsive">
            <table id="mytable" class="table table-bordred table-striped">
              <thead>
                <th>Public Key</th>
                <th>Balanced</th>
                <th>Mine block</th>
              </thead>  
              <tbody>
                <tr >
                  <td>{{data1.address}}</td>
                  <td>{{data2.balance}}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div class="clearfix"></div>
          </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data(){
      return{
        data1:{},
        data2:{}
      }
    },
    created(){
      axios({
        method: 'get',
        headers: {
        'x-access-token': JSON.parse(localStorage.getItem("user")).data.access_token,
        'Content-Type': 'application/json'
        },
        url: 'http://192.168.0.142:8088/api/blockchain'
      }).then(value=>{
        this.data1=value.data;
        axios({
        method: 'get',
        headers: {
        'x-access-token': JSON.parse(localStorage.getItem("user")).data.access_token,
        'Content-Type': 'application/json'
        },
        url: 'http://192.168.0.142:8088/api/blockchain/balance'
      }).then(value=>{
        this.data2 = value.data;
      })
      })
    }
  }
  require('@/assets/css/subPage.css')
</script>