<template>
  <AdaptFooterBackground :background-gradient="true">
    <Navbar/>
    <div>
      <WhiteBoard
          :title="PatientRecords.firstName + ' ' + PatientRecords.lastName"
      >

        <InfoBox :borderLeft="true" :title="'Informations personnelles'">
          <div class="flex flex-wrap md:gap-12 sm:gap-8 gap-4">
            <ul class="overflow-scrol">
              <li class="font-bold pb-2">Prénom</li>
              <li>{{ PatientRecords.firstName }}</li>
            </ul>
            <ul class="overflow-scrol">
              <li class="font-bold pb-2">Nom</li>
              <li>{{ PatientRecords.lastName }}</li>
            </ul>
            <ul class="overflow-scrol">
              <li class="font-bold pb-2">Mail</li>
              <li>{{ PatientRecords.email }}</li>
            </ul>
            <ul class="overflow-scrol">
              <li class="font-bold pb-2">Téléphone</li>
              <li>{{ PatientRecords.phone }}</li>
            </ul>
            <ul class="overflow-scrol">
              <li class="font-bold pb-2">Addresse</li>
              <li>{{ PatientRecords.address }}</li>
            </ul>
          </div>
        </InfoBox>

        <InfoBox :borderLeft="true" :title="'Informations Médicales'">
          <div class="flex flex-wrap md:gap-12 sm:gap-8 gap-4">
            <ul class="overflow-scrol">
              <li class="font-bold pb-2">Date de naissance</li>
              <li v-if="PatientRecords.birthDate !== null">{{ PatientRecords.birthDate }}</li>
              <li v-else>N/A</li>
            </ul>
            <ul class="overflow-scroll">
              <li class="font-bold pb-2">Poids</li>
              <li v-if="PatientRecords.weight !== null">{{ PatientRecords.weight }}</li>
              <li v-else>N/A</li>
            </ul>
            <ul class="overflow-scrol">
              <li class="font-bold pb-2">Numéro de sécurité sociale</li>
              <li v-if="PatientRecords.socialSecNb !== null">{{ PatientRecords.socialSecNb }}</li>
              <li v-else>N/A</li>
            </ul>
          </div>
        </InfoBox>

        <Table :btn="true" :research="true" :src="'/'" :title="'Ordonnances'" :type="'prescriptions'"
               class-title="ord-text-subtitle py-4"/>

        <div class="ord-whiteboard-buttons">
          <Button
              :class="'ord-button-green hover:ord-button-green-hover'"
              :src="'/'"
              :text="'Retour'"
          />
          <Button
              :class="'ord-button-red hover:ord-button-red-hover'"
              :src="'/'"
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
      PatientRecords:
          {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            birthDate: "",
            weight: "",
            socialSecNb: ""
          }
    }
  },
  created() {
    fetch("http://localhost:8081/patient/getRecord", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
        "Authorization": localStorage.getItem("WebToken"),
      },
    })
        .then(response => response.json())
        .then(response => {
          let res = response.result[0];
          this.PatientRecords.firstName = res.prenomPatient;
          this.PatientRecords.lastName = res.nomPatient;
          this.PatientRecords.email = res.mailCompte;
          this.PatientRecords.phone = [res.telCompte.slice(0, 2), " ", res.telCompte.slice(2, 4), " ", res.telCompte.slice(4, 6), " ", res.telCompte.slice(6, 8), " ", res.telCompte.slice(8, 10)].join('');
          this.PatientRecords.address = res.numeroAdresse + ' ' + res.rueAdresse + ', ' + res.codePostal + ', ' + res.communeAdresse;
          this.PatientRecords.birthDate = res.dateDeNaissance;
          this.PatientRecords.weight = res.poids;
          this.PatientRecords.socialSecNb = res.numeroSecu;
        })
  }
}
</script>

<style>

</style>