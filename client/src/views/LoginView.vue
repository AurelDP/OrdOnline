<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar/>
    <div class="flex justify-center">
      <WhiteBoard
          :title="'Connexion'"
          class="md:max-w-150"
      >
        <LoginForm/>
        <div class="ord-whiteboard-buttons">
          <Button
            :class="'ord-button-green hover:ord-button-green-hover'"
            :text="'Continuer'"
            :src="'/'"
          />
        </div>
      </WhiteBoard>
    </div>
  </AdaptFooterBackground>
</template>

<script>
import WhiteBoard from "@/components/globalComponents/WhiteBoard";
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";
import LoginForm from "@/components/loginPage/LoginForm";
import Button from "@/components/globalComponents/Button";

export default {
  name: "LoginView",
  components: {LoginForm, WhiteBoard, AdaptFooterBackground, Navbar, Button}
}
</script>

<style scoped>
@media (min-width: 758px) {
  .md\:max-w-150 {
    max-width: 70rem;
  }
}
</style>