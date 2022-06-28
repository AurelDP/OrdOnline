<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar/>
    <WhiteBoard
        title="Connexion"
        :button1="true"
        :class1="'ord-button-green hover:ord-button-green-hover'"
        :text1="'Continuer'"
        :src1="'/'"
    >
      <LoginForm/>
    </WhiteBoard>
  </AdaptFooterBackground>
</template>

<script>
import WhiteBoard from "@/components/globalComponents/WhiteBoard";
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";
import LoginForm from "@/components/loginPage/LoginForm";

export default {
  name: "LoginView",
  components: {LoginForm, WhiteBoard, AdaptFooterBackground, Navbar}
}
</script>

<style scoped>

</style>