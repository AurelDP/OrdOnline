<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <div class="md:px-24 sm:px-16 px-8 py-10">
      <HeaderLogo/>
      <div class="flex flex-col">
        <h2 class="mt-4 ord-text-title">S'inscrire</h2>
        <h5 class="mt-4 ord-text-subtitle">Vous êtes</h5>
        <div
            class="flex flex-row place-content-center flex-wrap gap-7">
          <CardRole role="patient"/>
          <CardRole role="doctor"/>
          <CardRole role="pharma"/>
          <CardRole role="healthService"/>
        </div>
      </div>
    </div>
  </AdaptFooterBackground>
</template>

<script>

import CardRole from "@/components/selectRole/CardRole";
import HeaderLogo from "@/components/selectRole/HeaderLogo";
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";

export default {
  name: "SelectRole",
  components: {
    HeaderLogo,
    CardRole,
    AdaptFooterBackground
  }
}
</script>

<style scoped>

</style>