<template>
  <AdaptFooterBackground :background-gradient="true">
    <Navbar/>
    <div>
      <WhiteBoard
          :title="firstName + ' ' + lastName"
      >

        <InfoBox :borderLeft="true" :title="'Informations personnelles'">
          <div class="flex flex-wrap md:gap-12 sm:gap-8 gap-4">
            <ul class="overflow-scroll">
              <li class="font-bold pb-2">Prénom</li>
              <li>{{ firstName }}</li>
            </ul>
            <ul class="overflow-scroll">
              <li class="font-bold pb-2">Nom</li>
              <li>{{ lastName }}</li>
            </ul>
            <ul class="overflow-scroll">
              <li class="font-bold pb-2">Mail</li>
              <li>{{ email }}</li>
            </ul>
            <ul class="overflow-scroll">
              <li class="font-bold pb-2">Téléphone</li>
              <li>{{ phone }}</li>
            </ul>
            <ul class="overflow-scroll">
              <li class="font-bold pb-2">Addresse</li>
              <li>{{ address }}</li>
            </ul>
          </div>
        </InfoBox>

        <InfoBox :borderLeft="true" :title="'Informations Médicales'">
          <div class="flex flex-wrap md:gap-12 sm:gap-8 gap-4">
            <ul class="overflow-scroll">
              <li class="font-bold pb-2">Date de naissance</li>
              <li v-if="birthDate !== null && birthDate !== ''">{{ birthDate }}</li>
              <li v-else>N/A</li>
            </ul>
            <ul class="overflow-scrolll">
              <li class="font-bold pb-2">Poids</li>
              <li v-if="weight !== null && weight !== ''">{{ weight }} kg</li>
              <li v-else>N/A</li>
            </ul>
            <ul class="overflow-scroll">
              <li class="font-bold pb-2">Numéro de sécurité sociale</li>
              <li v-if="socialSecNb !== null && socialSecNb !== ''">{{ socialSecNb }}</li>
              <li v-else>N/A</li>
            </ul>
          </div>
        </InfoBox>

        <Table
            v-if="role === 'doctor'"
            :button="true"
            :btnText="'Ajouter'"
            @buttonClick="addPrescription"
            :research="true"
            :title="'Ordonnances'"
            class-title="ord-text-subtitle py-4"
            :data="dataOrdo"
            :key="dataOrdo"
            @getClickValue="clickedPrescriptionID"
        />
        <Table
            v-else
            :research="true"
            :title="'Ordonnances'"
            class-title="ord-text-subtitle py-4"
            :data="dataOrdo"
            :key="dataOrdo"
            @getClickValue="clickedPrescriptionID"
        />

        <div class="ord-whiteboard-buttons">
          <Button
              :class="'ord-button-green hover:ord-button-green-hover'"
              :src="'/userSpace'"
              :text="'Retour'"
          />
          <Button
              v-if="role === 'doctor'"
              :class="'ord-button-red hover:ord-button-red-hover'"
              :src="''"
              :text="'Supprimer'"
          />
        </div>
      </WhiteBoard>
    </div>
  </AdaptFooterBackground>
</template>

<script>
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import WhiteBoard from "@/components/globalComponents/WhiteBoard";
import Navbar from "@/components/globalComponents/Navbar";
import Table from "@/components/globalComponents/Table/Table";
import InfoBox from "@/components/globalComponents/InfoBox";
import Button from "@/components/globalComponents/Button";

const BASE_URL = 'http://localhost:8081/';

export default {
  name: "PatientRecordView",
  components: {
    AdaptFooterBackground,
    Navbar,
    WhiteBoard,
    Table,
    InfoBox,
    Button
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      birthDate: "",
      weight: "",
      socialSecNb: "",
      dataOrdo: [],
      role: localStorage.getItem('Role'),
      idPatientAccount: 2,
    }
  },
  methods: {
    clickedPrescriptionID(value) {
      sessionStorage.setItem('prescriptionID', value);
      this.$router.push('/prescription');
    },
    addPrescription() {
      sessionStorage.setItem('patientAccountIDforNewPrescription', this.idPatientAccount);
      this.$router.push('/addPrescription');
    },
    getRecord() {
      fetch(BASE_URL + "patient/getRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
          "Authorization": localStorage.getItem("WebToken"),
        },
        body: JSON.stringify({
          idPatientAccount: this.idPatientAccount,
        })
      })
          .then(response => response.json())
          .then(response => {
            let res = response.result;
            this.firstName = res.prenomPatient;
            this.lastName = res.nomPatient;
            this.email = res.mailCompte;
            this.phone = [res.telCompte.slice(0, 2), " ", res.telCompte.slice(2, 4), " ", res.telCompte.slice(4, 6), " ", res.telCompte.slice(6, 8), " ", res.telCompte.slice(8, 10)].join('');
            this.address = res.numeroAdresse + ' ' + res.rueAdresse + ', ' + res.codePostal + ', ' + res.communeAdresse;
            this.birthDate = res.dateDeNaissance;
            this.weight = res.poids;
            this.socialSecNb = res.numeroSecu;
          });
    },
    getPrescriptions() {
      fetch(BASE_URL + "patient/getPrescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
          "Authorization": localStorage.getItem("WebToken"),
        },
        body: JSON.stringify({
          idPatientAccount: this.idPatientAccount,
        })
      })
          .then(response => response.json())
          .then(response => {
            if (response.result !== "error" && response.result !== "no prescriptions")
              this.dataOrdo = response.result;
            else if (response.result !== "no prescriptions")
              this.dataOrdo = [];
            else
              console.log("error");
          });
    }
  },
  created() {
    this.getRecord();
    this.getPrescriptions();
  }
}
</script>

<style>

</style>