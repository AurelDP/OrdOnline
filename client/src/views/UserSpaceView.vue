<template>
  <AdaptFooterBackground>
    <Navbar
        :buttons="true"
        :text1="'Mes infos'"
        :text2="'Déconnexion'"
        :icon1="'fa-info'"
        :icon2="'fa-arrow-right-from-bracket'"
        :src1="'/infoUser'"
        :src2="'/'"
        @button2Click="disconnect"
    />
    <div class="md:px-24 sm:px-16 px-8 py-10">
      <div v-if="role === 'patient'">
        <Table
            :research="true"
            :title="'Mes ordonnances'"
            class-title="ord-text-subtitle-bold py-4"
            :data="dataOrdo"
            :key="dataOrdo"
            @getClickValue="clickedPrescriptionID"
        />
        <Table
            :research="true"
            :title="'Mes médecins'"
            class-title="ord-text-subtitle-bold py-4"
            :data="dataDoctors"
            :key="dataDoctors"
        />
        <Table
            :only2Col="true"
            :research="true"
            :title="'Mes pharmacies'"
            class-title="ord-text-subtitle-bold py-4"
            :data="dataPharmas"
            :key="dataPharmas"
        />
      </div>

      <div v-if="role === 'doctor'">
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
        />
      </div>

      <div v-if="role === 'pharma'">
        <Table
            :research="true"
            :title="'Mes patients'"
            class-title="ord-text-subtitle-bold py-4"
            :data="dataPatientsPharma"
            :key="dataPatientsPharma"
            @getClickValue="clickedPatientID"
        />
      </div>
    </div>
  </AdaptFooterBackground>
</template>

<script>
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";
import Table from "@/components/globalComponents/Table/Table";

const BASE_URL = 'http://localhost:8081/';

export default {
  name: "UserSpace",
  components: {
    AdaptFooterBackground,
    Table,
    Navbar,
  },
  data() {
    return {
      role: localStorage.getItem('Role'),
      dataOrdo: [],
      dataDoctors: [],
      dataPharmas: [],
      dataPatientsDoctor: [],
      dataPatientsPharma: [],
    };
  },
  methods: {
    disconnect() {
      localStorage.removeItem("WebToken");
      sessionStorage.removeItem("prescriptionID");
      sessionStorage.removeItem("patientAccountIDforNewPrescription");
    },
    clickedPrescriptionID(prescriptionID) {
      sessionStorage.setItem("prescriptionID", prescriptionID);
      this.$router.push({ path: "/prescription" });
    },
    clickedPatientID() {

    },
    addPatient() {

    },
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
              this.dataOrdo = response.result;
            else if (response.result === "no prescriptions")
              this.dataOrdo = [];
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
    }
  },
  created() {
    if (this.role === "patient") {
      this.getPrescriptions();
      this.getPharmas();
    }
  }
}
</script>