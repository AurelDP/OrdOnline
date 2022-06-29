<template>
  <div>
    <div class="flex flex-wrap py-3 justify-between items-center">
      <span class="ord-text-title mr-2">
        {{ title }}
      </span>
      <div v-if="btn === true || research === true" class="flex flex-row my-5">
        <span v-if="btn === true">
          <Button class="ord-button-green mr-3" text="Ajouter" src="/"/>
        </span>
        <span v-if="research === true" class=" md:w-72 overflow-hidden">
            <input
                class="border-b-2 border-gray-400 focus:outline-none focus:border-ord-green-100 ml-3 w-full"
                type="text"
                placeholder="Research"
            />
          </span>
      </div>
    </div>
    <div class="max-h-72 overflow-auto drop-shadow-md my-5 rounded-lg bg-white">
      <table v-if="type === 'ord'" class="w-full">
        <TableRow
            v-for="value in dataOrdo"
            src="/" :val1="value.date"
            :val2="value.doctor"
            :val3="value.status"
            :type="'ord'"
            class="w-full"
        />
      </table>
      <table v-else-if="type === 'doctor'" class="w-full">
        <TableRow
            v-for="value in dataDoctor"
            src="/"
            :val1="value.doctor"
            :val2="value.specialist"
            :val3="value.address"
            :type="'doctor'"
        />
      </table>
      <table v-else class="w-full">
        <TableRow
            v-for="value in dataPharma"
            src="/"
            :val1="value.name"
            :val2="value.address"
            :type="'pharma'"
        />
      </table>
    </div>
  </div>
</template>

<script>

import Button from "@/components/globalComponents/Button";
import TableRow from "@/components/globalComponents/Table/TableRow";

export default {
  name: "Table",
  components: {
    Button,
    TableRow,
  },
  props: {
    title: String,
    btn: Boolean,
    research: Boolean,
    type: String,
  },
  data() {
    return {
      dataOrdo: [
        {date: '14/06/2022', status: 'En attente', doctor: 'Docteur Chaumont avec un long texte'},
        {date: '13/06/2022', status: 'En cours', doctor: 'Docteur Chaumont'},
        {date: '10/05/2022', status: 'En attente', doctor: 'Docteur Chaumont'},
      ],
      dataDoctor: [
        {
          specialist: 'Géneraliste',
          address: '4 rue charles Peguy, Palaiseau, 91120',
          doctor: 'Docteur Chaumomonomomomomomnt'
        },
        {specialist: 'Géneraliste', address: '4 rue charles Peguy, Palaiseau, 91120', doctor: 'Docteur Chaumont'},
        {specialist: 'Géneraliste', address: '4 rue charles Peguy, Palaiseau, 91120', doctor: 'Docteur Chaumont'},
      ],
      dataPharma: [
        {name: 'Pharmacie de Lozère', address: '4 rue charles Peguy, Palaiseau, 91120'},
        {name: 'Pharmacie de Villebon-sur-Yvette', address: '1344 avenue des platanes, Villebon-sur-Yvette, 91140'},
        {name: 'Grande pharmacie de Villebon', address: '41 avenue Charles de Gaulle, Villebon-sur-Yvette, 91140'},
      ]
    }
  }
}
</script>