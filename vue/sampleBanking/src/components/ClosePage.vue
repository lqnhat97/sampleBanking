<template>
  <div class="subContainer">
    <form class="form-horizontal" role="form" method="POST" action="/register">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <h2>Đóng tài khoản</h2>
          <hr>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 field-label-responsive">
          <label for="stk">Tài khoản nhận tiền</label>
        </div>
        <div class="col-auto my-1">
          <select v-model="selected" class="custom-select mr-sm-2">
            <option v-for="payAccount in payAccounts" v-bind:key="payAccount.soTaiKhoan" v-bind:value="payAccount.soTaiKhoan">
              <p v-if="payAccount.soTaiKhoan != this.stk">
                {{payAccount.soTaiKhoan}}
                </p>
            </option>
          </select>
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
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <button type="submit" class="btn btn-success"><i class="fa fa-user-plus"></i>Tạo</button>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        payAccounts: JSON.parse(localStorage.getItem("user")).data.paymentAccount
      }
    },
    props: {
      stk: {
        type: String,
        required: false
      }
    },
  }
  require('@/assets/css/subPage.css')
</script>