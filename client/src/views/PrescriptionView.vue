<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar/>
    <WhiteBoard v-if="this.statuses.length === 0"
        title="Ordonnance"
        :statut="true"
        :textStatut="'En attente'"
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
    <WhiteBoard v-else
                title="Ordonnance"
                :statut="true"
                :textStatut="this.statuses[0].status"
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
      <PrescriptionStatus
        :statuses="this.statuses"
      />
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

const BASE_URL = "http://localhost:8081/";
export default {
  name: "PrescriptionView",
  components: {
    Prescription,
    AdaptFooterBackground,
    Navbar,
    WhiteBoard,
    PrescriptionStatus,
    Button
  },
  data() {
    return {
      statuses: []
    }
  },
  methods: {
    getStatuses() {
      fetch(BASE_URL + "prescription/11/statuses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
          .then(response => response.json())
          .then(data => {
            this.statuses = data.statuses;
          })
          .catch(error => {
            console.log(error);
          });
    }
  },
  created() {
    this.getStatuses();
  }
}
</script>

<style scoped>

</style>