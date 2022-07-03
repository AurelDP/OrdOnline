<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar/>
    <WhiteBoard
        title="Informations Patient"
    >
      <RegisterFormPatient v-if="type === 'patient'"/>
    </WhiteBoard>
  </AdaptFooterBackground>
</template>

<script>
import WhiteBoard from "@/components/globalComponents/WhiteBoard";
import RegisterFormPatient from "@/components/registerPage/RegisterFormPatient";
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";

export default {
  name: "RegisterView",
  components: {RegisterFormPatient, WhiteBoard, AdaptFooterBackground, Navbar},
  props: {
    type: String,
  },
  created() {
    if (this.type !== "patient" && this.type !== "doctor" && this.type !== "pharma" && this.type !== "healthService")
      this.$router.push({ name: 'error' });
  }
}
</script>

<style scoped>

</style>