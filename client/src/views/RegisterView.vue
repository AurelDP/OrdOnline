<template>
  <AdaptFooterBackground v-bind:backgroundGradient="true">
    <Navbar/>
    <WhiteBoard title="Informations Patient">
      <RegisterForm/>
    </WhiteBoard>
  </AdaptFooterBackground>
</template>

<script>
import WhiteBoard from "@/components/globalComponents/WhiteBoard";
import RegisterForm from "@/components/registerPage/RegisterForm";
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";

export default {
  name: "RegisterView",
  components: {RegisterForm, WhiteBoard, AdaptFooterBackground, Navbar}
}
</script>

<style scoped>

</style>