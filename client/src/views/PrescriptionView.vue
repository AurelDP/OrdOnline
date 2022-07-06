<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar/>
    <WhiteBoard title="Ordonnance"
                :statut="true"
                :textStatut="this.statuses[0].status"
    >
      <Prescription
          v-if="this.statuses.length > 0"
          :prescription="this.prescription"
          :role="this.role"
          @delivery="actualiseTreatment"
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
      role: "",
      id: Number,
    }
  },
  methods: {
    getStatuses() {
      fetch(BASE_URL + "prescription/" + this.prescriptionID + "/statuses", {
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
    },
    getPrescription() {
      fetch(BASE_URL + "prescription/" + this.prescriptionID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
          .then(response => response.json())
          .then(data => {
            this.prescription = data.prescription;
            this.role = data.role;
          })
          .catch(error => {
            console.log(error);
          });
    },
    closePrescription() {
      fetch(BASE_URL + "prescription/" + this.prescriptionID + "/close", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      this.getStatuses();
    },
    actualisePrescription() {
      fetch(BASE_URL + "prescription/treatment/" + this.id + "/delivery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      });
      this.getPrescription();
    },
    actualiseTreatment(id) {
      this.id = id;
      for (let i in this.prescription.treatments) {
        if (this.prescription.treatments[i].id === id) {
          this.prescription.treatments[i].isDelivery = !this.prescription.treatments[i].isDelivery;
        }
      }
    },
    removeSessionStorage() {
      sessionStorage.removeItem("prescriptionID");
    }
  },
  created() {
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