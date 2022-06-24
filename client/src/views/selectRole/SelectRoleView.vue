<template>
  <div class="px-24 py-10 ord-background-gradient">
    <HeaderLogo/>
  <div class="flex flex-col place-content-center">
    <h5 class="mt-4 md:flex items-start text-4xl font-black text-ord-dark-blue">S'inscrire</h5>
    <h5 class="mt-4 md:flex items-start text-2xl text-ord-dark-blue">Vous êtes</h5>
    <div class="flex flex-col flex-wrap items-center md:items-center md:flex-row sm:flex-col sm:items-center place-content-evenly">
      <CardRole role="patient"/>
      <CardRole role="doctor"/>
      <CardRole role="pharma"/>
      <CardRole role="healthService"/>
    </div>
  </div>
  </div>
</template>

<script>

import CardRole from "@/components/selectRole/cardRole";
import HeaderLogo from "@/components/selectRole/headerLogo";

export default {
  name: "selectRole",
  components: {HeaderLogo, CardRole}
}
</script>

<style scoped>

</style>