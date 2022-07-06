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
            :only2Col="true"
        />
      </div>

      <div v-if="role === 'pharma'">
        <Table
            :research="true"
            :title="'Mes ordonnances'"
            class-title="ord-text-subtitle-bold py-4"
            :data="dataOrdoPharma"
            :key="dataOrdoPharma"
            @getClickValue="clickedPrescriptionPharmaID"
        />
      </div>
    </div>

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
  </AdaptFooterBackground>
</template>

<script>
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";
import Table from "@/components/globalComponents/Table/Table";
import AddPatient from "@/components/userSpace/AddPatient";
import Modal from "@/components/globalComponents/Modal";

const BASE_URL = 'http://localhost:8081/';

export default {
  name: "UserSpace",
  components: {
    AdaptFooterBackground,
    Table,
    Navbar,
    AddPatient,
    Modal
  },
  data() {
    return {
      role: localStorage.getItem('Role'),
      dataOrdoPatient: [],
      dataDoctors: [],
      dataPharmas: [],
      dataPatientsDoctor: [],
      dataOrdoPharma: [],
      showAddPatient: false,
      showModalSuccess: false,
      showModalError: false,
      doctorID: "",
      showDoctorModal: false,
    };
  },
  methods: {
    disconnect() {
      localStorage.removeItem("WebToken");
      sessionStorage.removeItem("prescriptionID");
      sessionStorage.removeItem("patientIDforNewPrescription");
      sessionStorage.removeItem("patientIDforRecord");
    },
    clickedPrescriptionID(prescriptionID) {
      sessionStorage.setItem("prescriptionID", prescriptionID);
      this.$router.push({ path: "/prescription" });
    },
    clickedPatientID(value) {
      sessionStorage.setItem("patientIDforRecord", value);
      this.$router.push({ path: "/patientRecord" });
    },
    clickedPrescriptionPharmaID(prescriptionID) {
      sessionStorage.setItem("prescriptionID", prescriptionID);
      this.$router.push({ path: "/prescription" });
    },
    addPatient() {
      this.showAddPatient = true;
    },
    closeAddPatient() {
      this.showAddPatient = false;
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
    },
    closeDoctorModal() {
      this.showDoctorModal = false;
    },
  },
  created() {
    if (this.role === "patient") {
      this.getPrescriptions();
      this.getPharmas();
      this.getDoctors();
    }
    if (this.role === "doctor") {
      this.getPatients();
    }
    if (this.role === "pharma") {
      this.getPrescriptionsPharma();
    }
  }
}
</script>