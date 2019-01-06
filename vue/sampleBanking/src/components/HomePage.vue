<template>
<div class="subContainer">
    <div>
    <p>Số tài khoản: {{stk}}</p>
    <p>Số dư: {{sodu}}</p>
    </div>
</div>
</template>

<script>
 export default {
  props: {
   stk: {
    type: String,
    required: true
   },
   sodu: {
    type: Number,
    required: true
   }
  }
 }
  require('@/assets/css/subPage.css')
</script>