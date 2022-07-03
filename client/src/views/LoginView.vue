<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar/>
    <div class="flex justify-center">
      <WhiteBoard
          title="Connexion"
          :button1="true"
          :class1="'ord-button-green hover:ord-button-green-hover'"
          :text1="'Continuer'"
          :src1="'/'"
          class="md:max-w-150"
      >
        <LoginForm/>
      </WhiteBoard>
    </div>
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
@media (min-width: 758px) {
  .md\:max-w-150 {
    max-width: 70rem;
  }
}
</style>