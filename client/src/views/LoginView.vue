<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar/>
    <WhiteBoard
        title="Connexion"
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