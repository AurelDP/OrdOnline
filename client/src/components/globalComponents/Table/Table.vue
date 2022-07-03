<template>
  <div>
    <div class="flex flex-wrap gap-5 mb-5 justify-between items-center">
      <span :class=classTitle>
        {{ title }}
      </span>
      <div v-if="btn === true || research === true" class="flex flex-row flex-wrap">
        <span v-if="btn === true">
          <Button class="ord-button-green hover:ord-button-green-hover mr-3 md:flex hidden" text="Ajouter" :src=src />
          <ButtonIcon class="ord-button-green hover:ord-button-green-hover mr-3 md:hidden flex" :icon="'fa-plus'" :src=src />
        </span>
        <span v-if="research === true">
          <div class="flex flex-row ord-input focus-within:border-ord-green-100">
            <input
                class="focus:outline-none"
                type="text"
                placeholder="Rechercher"
            />
            <button type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4" fill="#2D3047">
                <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/>
              </svg>
            </button>
          </div>
        </span>
      </div>
    </div>
    <!--
      Once we create the query there will be only one value 'data'.
      Replace 'dataOrdo' by 'data' in v-if to see when there is no content
    -->
    <div v-if="dataOrdo.length !== 0" class="max-h-60 overflow-auto shadow-no-offset rounded-lg bg-white">
      <table v-if="type === 'my_prescription'" class="w-full">
        <TableRow
            v-for="value in dataOrdo"
            src="/"
            :val1="value.date"
            :val2="value.doctor"
            :val3="value.status"
            :type="'my_prescription'"
        />
      </table>
      <table v-else-if="type === 'my_doctor'" class="w-full">
        <TableRow
            v-for="value in dataDoctor"
            src="/"
            :val1="value.doctor"
            :val2="value.specialist"
            :val3="value.address"
            :type="'my_doctor'"
        />
      </table>
      <table v-else-if="type === 'my_pharmacy'" class="w-full">
        <TableRow
            v-for="value in dataPharma"
            src="/"
            :val1="value.name"
            :val2="value.address"
            :type="'my_pharmacy'"
        />
      </table>
      <table v-else class="w-full">
        <TableRow
            v-for="value in dataOrdo"
            src="/"
            :val1="value.date"
            :val2="value.status"
            :type="'prescriptions'"
        />
      </table>
    </div>
    <div v-else class="p-10 drop-shadow-md my-5 rounded-lg bg-white">
      <h1 class="ord-text-subtitle-bold text-ord-lightred text-center">
        Aucune donnée pour le moment
      </h1>
      <img src="@/assets/no_data.svg" class="h-60 w-60 mx-auto opacity-70 mt-20" alt="Pas de données"/>
    </div>
  </div>
</template>

<script>

import Button from "@/components/globalComponents/Button";
import ButtonIcon from "@/components/globalComponents/ButtonIcon";
import TableRow from "@/components/globalComponents/Table/TableRow";

export default {
  name: "Table",
  components: {
    Button,
    TableRow,
    ButtonIcon
  },

  props: {
    title: String,
    src: String,
    classTitle: String,
    btn: Boolean,
    research: Boolean,
    type: String,
  },

  data() {
    return {
      dataOrdo: [
        {date: '14/06/2022', status: 'En attente', doctor: 'Docteur Chaumont avec un long texte'},
        {date: '13/06/2022', status: 'En cours', doctor: 'Docteur Chomeur'},
        {date: '10/05/2022', status: 'En attente', doctor: 'Docteur Chaumont'},
        {date: '09/01/2022', status: 'Terminée', doctor: 'Docteur Moutarde'},
        {date: '07/09/2021', status: 'Terminée', doctor: 'Docteur Marmite'},
        {date: '29/05/2021', status: 'Terminée', doctor: 'Docteur Enrico'},
        {date: '18/04/2021', status: 'Terminée', doctor: 'Docteur Mbappe'},
        {date: '02/01/2021', status: 'Terminée', doctor: 'Docteur Strange'},
      ],
      dataDoctor: [
        {specialist: 'Géneraliste', address: '4 rue charles Peguy, Palaiseau, 91120', doctor: 'Docteur Chaumont'},
        {specialist: 'Magicien', address: '4 rue charles Peguy, Palaiseau, 91120', doctor: 'Docteur Strange'},
        {specialist: 'Kinesitherapeute', address: '4 rue charles Peguy, Palaiseau, 91120', doctor: 'Docteur Mbappe'},
      ],
      dataPharma: [
        {name: 'Pharmacie de Lozère', address: '4 rue charles Peguy, Palaiseau, 91120'},
        {name: 'Pharmacie de Villebon-sur-Yvette', address: '1344 avenue des platanes, Villebon-sur-Yvette, 91140'},
        {name: 'Grande pharmacie de Villebon', address: '41 avenue Charles de Gaulle, Villebon-sur-Yvette, 91140'},
      ],
      dataPrescription: [
        {date: '14/06/2022', status: 'En attente'},
        {date: '13/06/2022', status: 'En cours'},
        {date: '10/05/2022', status: 'En attente'},
        {date: '09/01/2022', status: 'Terminée'},
        {date: '07/09/2021', status: 'Terminée'},
        {date: '29/05/2021', status: 'Terminée'},
        {date: '18/04/2021', status: 'Terminée'},
        {date: '02/01/2021', status: 'Terminée'},
      ],
      data: []
    }
  }
}
</script>

<style scoped>
.shadow-no-offset {
  box-shadow: 0 0 7px rgb(0 0 0 / 0.3), 0 0 15px rgb(0 0 0 / 0.1);
}
</style>