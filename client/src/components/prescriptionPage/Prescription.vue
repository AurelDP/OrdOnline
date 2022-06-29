<template>
  <div class="mt-10">
    <h2 class="ord-text-subtitle">Médecin</h2>
    <p class="my-5 px-5 border-l-2 border-ord-green-400">Patrick Chaumont, 4 Rue Charles Péguy, Palaiseau, 91120</p>
  </div>
  <div class="my-10">
    <h2 class="ord-text-subtitle">Patient</h2>
    <p class="my-5 px-5 border-l-2 border-ord-green-400">Jean Dupont, [âge si renseigné], [poids si renseigné]</p>
  </div>
  <div class="my-10">
    <h2 class="ord-text-subtitle">Traitements (2)</h2>
    <ul>
      <Treatment
        v-for="treatment in treatments"
        :name="treatment.name"
        :description="treatment.description"
        :isNotSubstitutable="treatment.isNotSubstitutable"
        :isNotReimbursable="treatment.isNotReimbursable"
        :renewal="treatment.renewal"
        :isDelivered="treatment.isDelivered"
      ></Treatment>
    </ul>
  </div>
  <div class="my-10">
    <h2 class="ord-text-subtitle">Conseils médicaux</h2>
    <p class="my-5 px-5 border-l-2 border-ord-green-400">Aucuns</p>
  </div>
</template>

<script>
import Treatment from "@/components/prescriptionPage/Treatment";
export default {
  name: "Prescription",
  components: {Treatment},
  data() {
    return {
      treatments: [
        {
          name: "Doliprane paracétamol 500mg 16 gélules",
          description: "Description du traitement si besoin",
          isNotSubstitutable: true,
          isNotReimbursable: false,
          renewal: "Modalités de renouvellement si besoin",
          isDelivered: true
        },
        {
          name: "Bétaméthasone Biogaran 30g 0.05% crème",
          description: "2 fois/jour pendant 2 semaines, puis espacer les prises (1/jours, 1/2jours, 1/3 jours) jusqu'à arrêt complet",
          isNotSubstitutable: false,
          isNotReimbursable: false,
          renewal: "",
          isDelivered: false
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>