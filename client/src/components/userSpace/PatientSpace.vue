<template>
  <Table
      :research="true"
      :title="'Mes ordonnances'"
      class-title="ord-text-subtitle-bold py-4"
      :data="dataOrdoPatient"
      :key="dataOrdoPatient"
      @getClickValue="clickedPrescriptionID"
  />
  <Table
      :research="true"
      :title="'Mes médecins'"
      class-title="ord-text-subtitle-bold py-4"
      :data="dataDoctors"
      :key="dataDoctors"
      :disableClick="true"
  />
  <Table
      :only2Col="true"
      :research="true"
      :title="'Mes pharmacies'"
      class-title="ord-text-subtitle-bold py-4"
      :data="dataPharmas"
      :key="dataPharmas"
      :disableClick="true"
  />
</template>

<script>
import Table from "@/components/globalComponents/Table/Table";

const BASE_URL = 'http://localhost:8081/';

export default {
  name: "PatientSpace",
  components: {
    Table
  },
  data() {
    return {
      dataOrdoPatient: [],
      dataDoctors: [],
      dataPharmas: [],
    };
  },
  methods: {
    getPrescriptions() {
      fetch(BASE_URL + "patient/getPrescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
          "Authorization": localStorage.getItem("WebToken"),
        }
      })
          .then(response => response.json())
          .then(response => {
            if (response.result !== "error" && response.result !== "no prescriptions")
              this.dataOrdoPatient = response.result;
            else if (response.result === "no prescriptions")
              this.dataOrdoPatient = [];
            else
              console.log("error");
          });
    },
    getDoctors() {
      fetch(BASE_URL + "patient/getDoctors", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
          "Authorization": localStorage.getItem("WebToken"),
        }
      })
          .then(response => response.json())
          .then(response => {
            if (response.result !== "error" && response.result !== "no doctors")
              this.dataDoctors = response.result;
            else if (response.result === "no doctors")
              this.dataDoctors = [];
            else
              console.log("error");
          });
    },
    getPharmas() {
      fetch(BASE_URL + "patient/getPharmas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
          "Authorization": localStorage.getItem("WebToken"),
        }
      })
          .then(response => response.json())
          .then(response => {
            if (response.result !== "error" && response.result !== "noPharmacies")
              this.dataPharmas = response.result;
            else if (response.result === "noPharmacies")
              this.dataPharmas = [];
            else
              console.log("error");
          });
    },
    clickedPrescriptionID(prescriptionID) {
      sessionStorage.setItem("prescriptionID", prescriptionID);
      this.$router.push({ path: "/prescription" });
    },
  },
  created() {
    this.getPrescriptions();
    this.getPharmas();
    this.getDoctors();
  }
}
</script>

<style scoped>

</style>