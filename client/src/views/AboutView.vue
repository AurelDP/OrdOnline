<template>
  <AdaptFooterBackground v-bind:backgroundGradient="false">
    <Navbar/>
    <h1>This is an about page</h1>
  </AdaptFooterBackground>
</template>

<script>
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";

export default {
  name: 'AboutView',
  components: {
    AdaptFooterBackground,
    Navbar
  }
}
</script>