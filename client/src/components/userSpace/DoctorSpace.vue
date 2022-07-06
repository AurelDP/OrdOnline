<template>
  <Table
      :button="true"
      :btnText="'Ajouter'"
      @buttonClick="addPatient"
      :research="true"
      :title="'Mes patients'"
      class-title="ord-text-subtitle-bold py-4"
      :data="dataPatientsDoctor"
      :key="dataPatientsDoctor"
      @getClickValue="clickedPatientID"
      :only2Col="true"
  />

  <AddPatient
      v-if="showAddPatient && this.role === 'doctor'"
      @clickedCloseAddPatient="closeAddPatient"
      @addThisPatient="addThisPatient"
  />

  <Modal
      v-show="showModalSuccess"
      @button1Click="closeModalSuccess"
      :icon="'fa-check'"
      :iconClass="'text-ord-green-100'"
      :textModal="'Patient ajouté avec succès'"
      :text1="'Continuer'"
      :class1="'ord-button-green hover:ord-button-green-hover'"
  />
  <Modal
      v-show="showModalError"
      @button1Click="closeModalError"
      :icon="'fa-warning'"
      :iconClass="'text-ord-red'"
      :textModal="'Patient déjà ajouté'"
      :text1="'Continuer'"
      :class1="'ord-button-green hover:ord-button-green-hover'"
  />
</template>

<script>
import Table from "@/components/globalComponents/Table/Table";
import AddPatient from "@/components/userSpace/AddPatient";
import Modal from "@/components/globalComponents/Modal";

const BASE_URL = 'http://localhost:8081/';

export default {
  name: "DoctorSpace",
  components: {
    Table,
    AddPatient,
    Modal
  },
  data() {
    return {
      dataPatientsDoctor: [],
      showAddPatient: false,
      role: localStorage.getItem('Role'),
      showModalSuccess: false,
      showModalError: false,
    };
  },
  methods: {
    addPatient() {
      this.showAddPatient = true;
    },
    closeAddPatient() {
      this.showAddPatient = false;
    },
    clickedPatientID(value) {
      sessionStorage.setItem("patientIDforRecord", value);
      this.$router.push({ path: "/patientRecord" });
    },
    getPatients() {
      fetch(BASE_URL + "doctor/getPatients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
          "Authorization": localStorage.getItem("WebToken"),
        }
      })
          .then(response => response.json())
          .then(response => {
            if (response.result !== "error" && response.result !== "noPatientsFound")
              this.dataPatientsDoctor = response.result;
            else if (response.result === "noPatientsFound")
              this.dataPatientsDoctor = [];
            else
              console.log("error");
          });
    },
    addThisPatient(patientID) {
      fetch(BASE_URL + "patient/addPatientToDoctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("WebToken"),
        },
        body: JSON.stringify({
          patientID: patientID,
        })
      })
          .then(response => response.json())
          .then(data => {
            if (data.result === "success") {
              this.showModalSuccess = true;
              this.getPatients();
            } else
              this.showModalError = true;
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
    this.getPatients();
  }
}
</script>

<style scoped>

</style>