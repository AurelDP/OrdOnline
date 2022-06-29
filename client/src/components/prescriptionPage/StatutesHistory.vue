<template>
  <div class="overflow-auto">
    <table class="md:table-fixed w-full">
      <tbody>
      <PrescriptionStatusRow
        :date="'07/02/2022'"
        :status="'En cours'"
        :location="'Pharmacie de Lozère'"
      />
      <PrescriptionStatusRow
          :date="'14/02/2022'"
          :status="'Terminée'"
          :location="'Grande pharmacie de Villebon'"
      />
      </tbody>
    </table>
  </div>
</template>

<script>
import PrescriptionStatusRow from "@/components/prescriptionPage/StatusRow.vue";

export default {
  name: "PrescriptionStatus",
  components: {
    PrescriptionStatusRow
  }
}
</script>

<style scoped>

</style>