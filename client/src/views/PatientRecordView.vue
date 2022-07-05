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
              <li v-if="birthDate !== null">{{ birthDate }}</li>
              <li v-else>N/A</li>
            </ul>
            <ul class="overflow-scrolll">
              <li class="font-bold pb-2">Poids</li>
              <li v-if="weight !== null">{{ weight }}</li>
              <li v-else>N/A</li>
            </ul>
            <ul class="overflow-scroll">
              <li class="font-bold pb-2">Numéro de sécurité sociale</li>
              <li v-if="socialSecNb !== null">{{ socialSecNb }}</li>
              <li v-else>N/A</li>
            </ul>
          </div>
        </InfoBox>

        <Table
            :button="true"
            :btnText="'Ajouter'"
            @buttonClick="console.log('clicked')"
            :research="true"
            :title="'Ordonnances'"
            class-title="ord-text-subtitle py-4"
            :data="dataOrdo"
            @getClickValue="checkValue"
        />

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
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      birthDate: "",
      weight: "",
      socialSecNb: "",
      dataOrdo: [
        {date: '14/06/2022', doctor: 'Docteur Chaumont avec un long texte', status: 'En attente'},
        {date: '13/06/2022', doctor: 'Docteur Chomeur', status: 'En cours'},
        {date: '10/05/2022', doctor: 'Docteur Chaumont', status: 'En attente'},
        {date: '09/01/2022', doctor: 'Docteur Moutarde', status: 'Terminée'},
        {date: '07/09/2021', doctor: 'Docteur Marmite', status: 'Terminée'},
        {date: '29/05/2021', doctor: 'Docteur Enrico', status: 'Terminée'},
        {date: '18/04/2021', doctor: 'Docteur Mbappe', status: 'Terminée'},
        {date: '02/01/2021', doctor: 'Docteur Strange', status: 'Terminée'},
      ],
    }
  },
  methods: {
    checkValue(value) {

    }
  },
  created() {
    fetch("http://localhost:8081/patient/getRecord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
        "Authorization": localStorage.getItem("WebToken"),
      },
      body: JSON.stringify({
        id: 1,
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
        })
  }
}
</script>

<style>

</style>