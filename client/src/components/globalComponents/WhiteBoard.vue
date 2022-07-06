<template>
  <div class="w-full">
    <div class="relative md:p-14 sm:p-10 p-6 my-20 md:mx-44 sm:mx-24 mx-6 bg-white shadow-lg">
      <div
          v-if="statut === true"
          class="absolute md:-right-4 md:top-4 md:w-40 right-0 -top-10 w-full py-2 px-4 bg-white-gray text-xl shadow-lg"
      >
        <p v-if="textStatut === 'En attente'" class="text-ord-lightred">{{ textStatut }}</p>
        <p v-else-if="textStatut === 'En cours'" class="text-ord-green-100">{{ textStatut }}</p>
        <p v-else>{{ textStatut }}</p>
      </div>
      <h1 class="ord-text-title text-center mb-10">{{ title }}</h1>
      <slot/>
    </div>
  </div>
</template>

<script>
import Button from "@/components/globalComponents/Button";

export default {
  name: "WhiteBoard",
  props: {
    title: String,
    statut: Boolean,
    textStatut: String,
  },
  components: {Button}
}
</script>

<style scoped>

</style>