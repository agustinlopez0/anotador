<template>
  <main id="app">

    <MyNavbar />
    <router-view  />
  
  </main>
</template>

<script>
import MyNavbar from '@/components/MyNavbar.vue'

export default {
  name: 'App',
  components: {
    MyNavbar
  }
}
</script>

<style>
body {
  background-color: rgb(250, 250, 250);
}
</style>
