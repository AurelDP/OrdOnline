<template>
  <tr class="border-b-2">
    <td class="p-2">{{ date }}</td>
    <td v-if="status === 'En cours'" class="p-2 text-ord-green-100">{{ status }}</td>
    <td v-else-if="status === 'En attente'" class="p-2 text-ord-red">{{ status }}</td>
    <td v-else class="p-2">{{ status }}</td>
    <td class="p-2 text-right">{{ location }}</td>
  </tr>
</template>

<script>
export default {
  name: "PrescriptionStatusRow",
  props: {
    date: String,
    status: String,
    location: String
  }
}
</script>

<style scoped>

</style>