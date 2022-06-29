<template>

  <div class="table-row w-full border-b-2 hover:bg-ord-green-600">

    <div class="table-cell p-3 whitespace-nowrap overflow-hidden">{{ val1 }}</div>

    <div class="table-cell p-3 whitespace-nowrap overflow-hidden">{{ val2 }}</div>

    <div v-if="type === 'ord' || type === 'doctor'" class="table-cell py-3 px-8 whitespace-nowrap text-right overflow-hidden">{{ val3 }}</div>
  </div>

</template>

<script>
export default {
  name: "TableRow",
  props: {
    src: String,
    val1: String,
    val2: String,
    val3: String,
    type: String,
  }
}

</script>

<style scoped>

</style>