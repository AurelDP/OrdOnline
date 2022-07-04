<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar/>
    <WhiteBoard
        :title="title"
    >
      <RegisterForm :type="type"/>
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
  components: {RegisterForm, WhiteBoard, AdaptFooterBackground, Navbar},
  props: {
    type: String,
  },
  data() {
    return {
      title: '',
    };
  },
  created() {
    switch (this.type) {
      case "patient":
        this.title = "Inscription Patient";
        break;
      case "doctor":
        this.title = "Inscription Médecin";
        break;
      case "pharma":
        this.title = "Inscription Pharmacien";
        break;
      case "healthService":
        this.title = "Inscription Service de Santé";
        break;
      default:
        this.$router.push({ name: 'error' });
        break;
    }
  }
}
</script>

<style scoped>

</style>