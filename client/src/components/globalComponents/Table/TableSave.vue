<template>

</template>

<script>

export default {
  name: "TableSave",
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

</style>