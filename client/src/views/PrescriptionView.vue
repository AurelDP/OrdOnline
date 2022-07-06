<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar/>
    <WhiteBoard
        v-if="this.statuses.length > 0"
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
            :src="''"
            @click="removeSessionStorage"
        />
        <Button
            v-if="this.role === 'doctor' && this.statuses[0].status !== 'Fermée'"
            :class="'ord-button-red hover:ord-button-red-hover'"
            :text="'Fermer'"
            :src="'/prescription'"
            @click="closePrescription"
        />
        <Button
            v-if="this.role === 'pharma' && this.statuses[0].status !== 'Fermée'"
            :class="'ord-button-green hover:ord-button-green-hover'"
            :text="'Sauvegarder'"
            :src="'/prescription'"
            @click="actualisePrescription"
        />
        <Button
            v-if="this.role === 'patient'"
            :class="'ord-button-green hover:ord-button-green-hover'"
            :text="'Ajouter pharmacie'"
            :src="''"
            @click="addPharma"
        />
      </div>
    </WhiteBoard>

    <WhiteBoard
        v-if="this.statuses.length > 0"
        title="Historique des statuts"
    >
      <PrescriptionStatus
          :statuses="this.statuses"
      />
    </WhiteBoard>

    <AddPharma
        v-if="showAddPharma && this.role === 'patient'"
        @clickedCloseAddPharma="closeAddPharma"
        @addThisPharma="addThisPharma"
    />

    <Modal
        v-show="showModalSuccess"
        @button1Click="closeModalSuccess"
        :icon="'fa-check'"
        :iconClass="'text-ord-green-100'"
        :textModal="this.textModalSuccess"
        :text1="'Continuer'"
        :class1="'ord-button-green hover:ord-button-green-hover'"
    />
    <Modal
        v-show="showModalError"
        @button1Click="closeModalError"
        :icon="'fa-warning'"
        :iconClass="'text-ord-red'"
        :textModal="this.textModalError"
        :text1="'Continuer'"
        :class1="'ord-button-green hover:ord-button-green-hover'"
    />
  </AdaptFooterBackground>
</template>

<script>
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";
import WhiteBoard from "@/components/globalComponents/WhiteBoard";
import Prescription from "@/components/prescriptionPage/Prescription";
import PrescriptionStatus from "@/components/prescriptionPage/StatutesHistory";
import Button from "@/components/globalComponents/Button";
import AddPharma from "@/components/prescriptionPage/AddPharma";
import Modal from "@/components/globalComponents/Modal";

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
    Button,
    AddPharma,
    Modal,
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
      treatmentsToActualiseIds: [],
      showAddPharma: false,
      showModalSuccess: false,
      showModalError: false,
      textModalSuccess: "",
      textModalError: "",
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
            if (data.statuses !== "error") {
              this.statuses = data.statuses;
            }
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
            if (data.prescription !== "error") {
              this.prescription = data.prescription;
            }
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
      })
          .then(response => response.json())
          .then(data => {
            if (data.result !== "error") {
              this.textModalSuccess = "Ordonnance modifiée avec succès";
              this.showModalSuccess = true;
            } else {
              this.textModalError = "Problème dans la modification de l\'ordonnance";
              this.showModalError = true;
            }
          });
      this.getPrescription();
      this.getStatuses();
    },
    saveTreatmentToActualise(treatmentId) {
      this.treatmentsToActualiseIds.push(treatmentId);
    },
    removeSessionStorage() {
      sessionStorage.removeItem("prescriptionID");
      this.$router.back();
    },
    addPharma() {
      this.showAddPharma = true;
    },
    closeAddPharma() {
      this.showAddPharma = false;
    },
    addThisPharma(pharmaID) {
      fetch(BASE_URL + "pharma/addPharmaToPrescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("WebToken"),
        },
        body: JSON.stringify({
          pharmaID: pharmaID,
          prescriptionID: this.prescriptionID,
        })
      })
          .then(response => response.json())
          .then(data => {
            if (data.result === "success") {
              this.textModalSuccess = "Pharmacie ajoutée à l\'ordonnance";
              this.showModalSuccess = true;
            } else {
              this.textModalError = "Pharmacie déjà ajoutée à cette ordonnance";
              this.showModalError = true;
            }
          });
    },
    closeModalSuccess() {
      this.showModalSuccess = false;
    },
    closeModalError() {
      this.showModalError = false;
    }
  },
  created() {
    this.role = localStorage.getItem("Role");
    this.prescriptionID = sessionStorage.getItem('prescriptionID') ? sessionStorage.getItem('prescriptionID') : this.$router.back();
    if (sessionStorage.getItem('prescriptionID') !== null) {
      this.getPrescription();
      this.getStatuses();
    }
  }
}
</script>

<style scoped>

</style>