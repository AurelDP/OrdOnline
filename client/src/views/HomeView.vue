<template>
  <AdaptFooterBackground v-bind:backgroundGradient="true">
      <img alt="Vue logo" src="../assets/logo.png" class="h-28 w-28">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
  </AdaptFooterBackground>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Footer from '@/components/Footer.vue'
import AdaptFooterBackground from "@/components/AdaptFooterBackground";

export default {
  name: 'HomeView',
  components: {
    AdaptFooterBackground,
    HelloWorld,
    Footer
  }
}
</script>
