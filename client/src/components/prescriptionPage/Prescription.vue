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
      <li class="my-5 py-1 border-b-2">
        <div class="flex flex-wrap">
          <p class="w-full md:w-1/2">Doliprane paracétamol 500mg 16 gélules</p>
          <p class="w-full md:w-1/2 md:text-right">Substituable, Remboursable</p>
        </div>
        <p>[Description du traitement si besoin]</p>
        <div class="flex flex-wrap">
          <p class="w-full md:w-1/2">[Modalités de renouvellement si besoin]</p>
          <div class="w-full md:w-1/2 md:text-right">
            <label for="delivered" class="mr-5">Delivré</label>
            <input type="checkbox" id="delivered" name="delivered" checked/>
          </div>
        </div>
      </li>
      <li class="my-5 py-1 border-b-2">
        <div class="flex flex-wrap">
          <p class="w-full md:w-1/2">Bétaméthasone Biogaran 30g 0.05% crème</p>
          <p class="w-full md:w-1/2 md:text-right">Non substituable, Remboursable</p>
        </div>
        <p>2 fois/jour pendant 2 semaines, puis espacer les prises (1/jours, 1/2jours, 1/3 jours) jusqu'à arrêt complet</p>
        <div class="flex flex-wrap">
          <p class="w-full md:w-1/2"></p>
          <div class="w-full md:w-1/2 md:text-right">
            <label for="delivered" class="mr-5">Delivré</label>
            <input type="checkbox" id="delivered" name="delivered" checked/>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="my-10">
    <h2 class="ord-text-subtitle">Conseils médicaux</h2>
    <p class="my-5 px-5 border-l-2 border-ord-green-400">Aucuns</p>
  </div>
</template>

<script>
export default {
  name: "Prescription"
}
</script>

<style scoped>
</style>