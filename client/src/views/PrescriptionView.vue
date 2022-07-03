<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar/>
    <WhiteBoard
        title="Ordonnance"
        :statut="true"
        :textStatut="'Terminée'"
    >
      <Prescription/>
      <div class="ord-whiteboard-buttons">
        <Button
            :class="'ord-button-green hover:ord-button-green-hover'"
            :text="'Retour'"
            :src="'/'"
        />
        <Button
            :class="'ord-button-green hover:ord-button-green-hover'"
            :text="'Modifier'"
            :src="'/'"
        />
      </div>
    </WhiteBoard>
    <WhiteBoard
        title="Historique des statuts"
    >
      <PrescriptionStatus/>
    </WhiteBoard>
  </AdaptFooterBackground>
</template>

<script>
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";
import WhiteBoard from "@/components/globalComponents/WhiteBoard";
import Prescription from "@/components/prescriptionPage/Prescription";
import PrescriptionStatus from "@/components/prescriptionPage/StatutesHistory";
import Button from "@/components/globalComponents/Button";

export default {
  name: "PrescriptionView",
  components: {
    Prescription,
    AdaptFooterBackground,
    Navbar,
    WhiteBoard,
    PrescriptionStatus,
    Button
  }
}
</script>

<style scoped>

</style>