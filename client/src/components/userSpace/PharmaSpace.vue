<template>
  <Table
      :research="true"
      :title="'Mes ordonnances'"
      class-title="ord-text-subtitle-bold py-4"
      :data="dataOrdoPharma"
      :key="dataOrdoPharma"
      @getClickValue="clickedPrescriptionPharmaID"
  />
</template>

<script>
import Table from "@/components/globalComponents/Table/Table";

const BASE_URL = 'http://localhost:8081/';

export default {
  name: "PharmaSpace",
  components: {
    Table
  },
  data() {
    return {
      dataOrdoPharma: [],
    };
  },
  methods: {
    clickedPrescriptionPharmaID(prescriptionID) {
      sessionStorage.setItem("prescriptionID", prescriptionID);
      this.$router.push({ path: "/prescription" });
    },
    getPrescriptionsPharma() {
      fetch(BASE_URL + "pharma/getPrescriptions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
          "Authorization": localStorage.getItem("WebToken"),
        }
      })
          .then(response => response.json())
          .then(response => {
            if (response.result !== "error" && response.result !== "no prescriptions")
              this.dataOrdoPharma = response.result;
            else if (response.result === "no prescriptions")
              this.dataOrdoPharma = [];
            else
              console.log("error");
          });
    },
  },
  created() {
    this.getPrescriptionsPharma();
  }
}
</script>

<style scoped>

</style>