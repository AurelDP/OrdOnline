<template>
 <AdaptFooterBackground :backgroundGradient="true">
   <Navbar/>
   <InfoPatient/>
 </AdaptFooterBackground>
</template>

<script>
import InfoPatient from '@/components/infoPatient/InfoPatient.vue'
import Navbar from '@/components/globalComponents/Navbar.vue'
import AdaptFooterBackground from '@/components/globalComponents/AdaptFooterBackground.vue'

export default {
  name: "InfoPatientView",
  components: {
    InfoPatient,
    Navbar,
    AdaptFooterBackground
  }
}
</script>

<style scoped>

</style>