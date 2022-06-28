<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar/>
    <WhiteBoard
        title="Ordonnance"
        :button1="true"
        :class1="'ord-button-green hover:ord-button-green-hover'"
        :text1="'Retour'"
        :src1="'/'"
        :button2="true"
        :class2="'ord-button-green hover:ord-button-green-hover'"
        :text2="'Modifier'"
        :src2="'/'"
    >
    </WhiteBoard>
    <WhiteBoard></WhiteBoard>
  </AdaptFooterBackground>
</template>

<script>
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";
import WhiteBoard from "@/components/globalComponents/WhiteBoard";

export default {
  name: "PrescriptionView",
  components: {
    AdaptFooterBackground,
    Navbar,
    WhiteBoard
  }
}
</script>

<style scoped>

</style>