<template>
  <tr class="border-b-2 hover:bg-ord-green-600 hover:cursor-pointer" @click="goTo">
    <td class="p-3 whitespace-nowrap">{{ val1 }}</td>
    <td class="p-3 whitespace-nowrap">{{ val2 }}</td>
    <td v-if="val3 === 'En attente'" class="py-3 px-8 whitespace-nowrap text-right text-ord-lightred">{{ val3 }}</td>
    <td v-else-if="val3 === 'En cours'" class="py-3 px-8 whitespace-nowrap text-right text-ord-green-100">{{ val3 }}</td>
    <td v-else-if="val3 === 'Terminée'" class="py-3 px-8 whitespace-nowrap text-right">{{ val3 }}</td>
    <td v-else-if="(type === 'ord' || type === 'doctor')" class="py-3 px-8 whitespace-nowrap text-right">{{ val3 }}</td>
  </tr>
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
  },
  methods: {
    goTo() {
      this.$router.push(this.src);
    }
  }
}

</script>