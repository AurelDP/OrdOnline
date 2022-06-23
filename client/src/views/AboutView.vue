<template>
  <AdaptFooterBackground v-bind:backgroundGradient="false">
      <h1>This is an about page</h1>
  </AdaptFooterBackground>
</template>

<script>
import Footer from '@/components/Footer.vue'
import AdaptFooterBackground from "@/components/AdaptFooterBackground";

export default {
  name: 'AboutView',
  components: {
    AdaptFooterBackground,
    Footer
  }
}
</script>