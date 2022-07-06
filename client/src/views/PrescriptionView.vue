<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar/>
    <WhiteBoard v-if="this.statuses.length > 0"
                title="Ordonnance"
                :statut="true"
                :textStatut="this.statuses[0].status"
    >
      <Prescription
          :prescription="this.prescription"
          :statuses="this.statuses"
          @treatmentDeliveryStatusActualisation="saveTreatmentToActualise"
      />
      <div class="ord-whiteboard-buttons">
        <Button
            :class="'ord-button-green hover:ord-button-green-hover'"
            :text="'Retour'"
            :src="'/patientRecord'"
            @click="removeSessionStorage"
        />
        <Button
            v-if="this.role === 'doctor' && this.statuses[0].status !== 'Fermée'"
            :class="'ord-button-red hover:ord-button-red-hover'"
            :text="'Fermer'"
            :src="'/prescription'"
            @click="this.closePrescription"
        />
        <Button
            v-if="this.role === 'pharma' && this.statuses[0].status !== 'Fermée'"
            :class="'ord-button-green hover:ord-button-green-hover'"
            :text="'Sauvegarder'"
            :src="'/prescription'"
            @click="this.actualisePrescription"
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
  emits: ["treatmentDeliveryStatusActualisation"],
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
      role: "",
      prescriptionID: "",
      statuses: [],
      prescription: {
        medicalAdvices: "",
        patient: {
          lastName: "",
          firstName: "",
          birthDate: "",
          weight: Number,
        },
        doctor: {
          lastName: "",
          firstName: "",
          address: "",
        },
        treatments: [],
      },
      treatmentsToActualiseIds: []
    }
  },
  methods: {
    getStatuses() {
      fetch(BASE_URL + "prescription/" + this.prescriptionID + "/statuses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("WebToken"),
        }
      })
          .then(response => response.json())
          .then(data => {
            this.statuses = data.statuses;
          })
          .catch(error => {
            console.log(error);
          });
    },
    getPrescription() {
      fetch(BASE_URL + "prescription/" + this.prescriptionID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("WebToken"),
        }
      })
          .then(response => response.json())
          .then(data => {
            this.prescription = data.prescription;
          })
          .catch(error => {
            console.log(error);
          });
    },
    closePrescription() {
      fetch(BASE_URL + "prescription/" + this.prescriptionID + "/close", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("WebToken"),
        }
      });
      this.getStatuses();
    },
    actualisePrescription() {
      console.log(this.treatmentsToActualiseIds);
      fetch(BASE_URL + "prescription/" + this.prescriptionID + "/treatments/delivery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("WebToken"),
        },
        body: JSON.stringify({
          treatmentsToActualiseIds: this.treatmentsToActualiseIds,
          treatments: this.prescription.treatments
        })
      });
      this.getPrescription();
      this.getStatuses();
    },
    saveTreatmentToActualise(treatmentId) {
      this.treatmentsToActualiseIds.push(treatmentId);
    },
    removeSessionStorage() {
      sessionStorage.removeItem("prescriptionID");
    }
  },
  created() {
    this.role = localStorage.getItem("Role");
    this.prescriptionID = sessionStorage.getItem('prescriptionID') ? sessionStorage.getItem('prescriptionID') : this.$router.push('/patientRecord');
    if (sessionStorage.getItem('prescriptionID') !== null) {
      this.getPrescription();
      this.getStatuses();
    }
  }
}
</script>

<style scoped>

</style>