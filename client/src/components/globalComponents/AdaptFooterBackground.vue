<template>
  <BackgroundGradient v-if="backgroundGradient === true" class="flex flex-col">
    <slot/>
    <Footer/>
  </BackgroundGradient>
  <div v-else class="min-h-screen flex flex-col">
    <slot/>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/globalComponents/Footer.vue'
import BackgroundGradient from "@/components/globalComponents/BackgroundGradient";

export default {
  name: "AdaptFooterBackground",
  components: {
    BackgroundGradient,
    Footer
  },
  props: {
    backgroundGradient: Boolean
  }
}
</script>

<style scoped>

</style>