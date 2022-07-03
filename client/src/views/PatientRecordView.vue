<template>
  <AdaptFooterBackground :background-gradient="true">
    <Navbar/>
    <div>
      <WhiteBoard :button1="true"
                  :button2="true"
                  :title="PatientRecords.firstName + ' ' + PatientRecords.lastName"
                  class1="ord-button-green hover:ord-button-green-hover"
                  class2="ord-button-red hover:ord-button-red-hover"
                  src1="/"
                  src2="/"
                  text1="Retour"
                  text2="Supprimer">
        <h1 class="ord-text-subtitle py-4">Informations personnelles</h1>
        <div class="flex flex-wrap border-l-2 border-ord-green-100">
          <ul class="info">
            <li class="font-bold pb-2">Prénom</li>
            <li>{{ PatientRecords.firstName }}</li>
          </ul>
          <ul class="info">
            <li class="font-bold pb-2">Nom</li>
            <li>{{ PatientRecords.lastName }}</li>
          </ul>
          <ul class="info">
            <li class="font-bold pb-2">Mail</li>
            <li>{{ PatientRecords.email }}</li>
          </ul>
          <ul class="info">
            <li class="font-bold pb-2">Téléphone</li>
            <li>{{ PatientRecords.phone }}</li>
          </ul>
          <ul class="info">
            <li class="font-bold pb-2">Addresse</li>
            <li>{{ PatientRecords.address }}</li>
          </ul>
        </div>

        <h1 class="ord-text-subtitle py-4">Informations Médicales</h1>
        <div class="flex flex-wrap border-l-2 border-ord-green-100 px-5">
          <ul class="info">
            <li class="font-bold pb-2">Date de naissance</li>
            <li v-if="PatientRecords.birthDate !== null">{{ PatientRecords.birthDate }}</li>
            <li v-else>N/A</li>
          </ul>
          <ul class="info">
            <li class="font-bold pb-2">Poids</li>
            <li v-if="PatientRecords.weight !== null">{{ PatientRecords.weight }}</li>
            <li v-else>N/A</li>
          </ul>
          <ul class="info">
            <li class="font-bold pb-2">Numéro de sécurité sociale</li>
            <li v-if="PatientRecords.socialSecNb !== null">{{ PatientRecords.socialSecNb }}</li>
            <li v-else>N/A</li>
          </ul>
        </div>

        <Table :btn="true" :src="'/'" :research="true" :title="'Ordonnances'" :type="'prescriptions'"
               class-title="ord-text-subtitle py-4"/>

      </WhiteBoard>
    </div>
  </AdaptFooterBackground>
</template>

<script>
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import WhiteBoard from "@/components/globalComponents/WhiteBoard";
import Navbar from "@/components/globalComponents/Navbar";
import Table from "@/components/globalComponents/Table/Table";

export default {
  name: "PatientRecordView",
  components: {
    AdaptFooterBackground,
    Navbar,
    WhiteBoard,
    Table,
  },

  data() {
    return {
      PatientRecords:
          {
            firstName: "Aurélien",
            lastName: "Duval",
            email: "aurel1100@gmail.fr",
            phone: "06 06 06 06 06",
            address: "42 avenue des tournesols, Palaiseau, 91120",
            birthDate: null,
            weight: null,
            socialSecNb: null
          }
    }
  }
}
</script>

<style>

.info {
  margin: 1rem 1.5rem 1rem 1.5rem;
  /* overflow especially for long email address*/
  overflow: scroll;
}

</style>