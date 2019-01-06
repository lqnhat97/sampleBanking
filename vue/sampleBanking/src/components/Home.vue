<template>
  <div>
    <h1>InternetBanking</h1>
    <div id="menu">
      <router-view />
    </div>
  </div>

</template>



<script>
  export default {
    name: 'home',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
  require('@/assets/css/home.css')
</script>