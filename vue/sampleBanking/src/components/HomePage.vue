<template>
  <div class="subContainer">
    <table class="table table-sm">
        <thead>
          <tr>
            <th>Số tài khoản</th>
            <th>Số dư</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{stk}}</td>
            <td>{{sodu}}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
  export default {
    props: {
      stk: {
        type: String,
        required: false
      },
      sodu: {
        type: Number,
        required: false
      }
    }
  }
  require('@/assets/css/subPage.css')
</script>