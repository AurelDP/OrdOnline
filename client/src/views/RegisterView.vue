<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar/>
    <WhiteBoard
        title="Informations Patient"
    >
      <RegisterForm/>
      <div class="ord-whiteboard-buttons">
        <Button
            :class="'ord-button-green hover:ord-button-green-hover'"
            :text="'Confirmer'"
            :src="'/'"
        />
      </div>
    </WhiteBoard>
  </AdaptFooterBackground>
</template>

<script>
import WhiteBoard from "@/components/globalComponents/WhiteBoard";
import RegisterForm from "@/components/registerPage/RegisterForm";
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";
import Button from "@/components/globalComponents/Button";

export default {
  name: "RegisterView",
  components: {RegisterForm, WhiteBoard, AdaptFooterBackground, Navbar, Button}
}
</script>

<style scoped>

</style>