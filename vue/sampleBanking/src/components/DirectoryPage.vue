<template>
  <div class="subContainer">
    <table class="table table-sm">
        <thead>
          <tr>
            <th>Danh bạ</th>
            <th>Số dư</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: Number,
        required: false
      }
    }
  }
  require('@/assets/css/subPage.css')
</script>