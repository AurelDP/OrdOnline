<template>
  <AdaptFooterBackground :background-gradient="true">
    <Navbar/>
    <div>
      <WhiteBoard
        :title="PatientRecords.firstName + ' ' + PatientRecords.lastName"
      >

        <InfoBox :title="'Informations personnelles'" :borderLeft="true">
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

        <InfoBox :title="'Informations Médicales'" :borderLeft="true">
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

        <Table :btn="true" :src="'/'" :research="true" :title="'Ordonnances'" :type="'prescriptions'"
               class-title="ord-text-subtitle py-4"/>

        <div class="ord-whiteboard-buttons">
          <Button
              :class="'ord-button-green hover:ord-button-green-hover'"
              :text="'Retour'"
              :src="'/'"
          />
          <Button
              :class="'ord-button-red hover:ord-button-red-hover'"
              :text="'Supprimer'"
              :src="'/'"
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

</style>