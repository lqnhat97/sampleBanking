<template>
  <div class="subContainer">
    <div class="card">
        <div class="card-body">
      <p class="card-text">
        Số tài khoản: {{stk}}
      </p>
      <p class="card-text">
        Số dư: {{sodu}}
      </p>
        </div>
    </div>
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