<template>
  <div class="overflow-auto">
    <table class="md:table-fixed w-full">
      <tbody v-for="status in this.statuses">
        <PrescriptionStatusRow
          :date="status.date"
          :status="status.status"
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
  },
  props: {
    statuses: Array,
  }
}
</script>

<style scoped>

</style>