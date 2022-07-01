<template>
  <AdaptFooterBackground>
    <div class="md:px-24 sm:px-16 px-8 py-10">
      <Table :btn="false" :research="true" :title="'Mes ordonnances'" :type="'ord'"/>
      <Table :btn="true" :research="true" :title="'Mes médecins'" :type="'doctor'"/>
      <Table :btn="true" :research="true" :title="'Mes pharmacies'" :type="'pharma'"/>
    </div>
  </AdaptFooterBackground>
</template>

<script>

import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Table from "@/components/globalComponents/Table/Table";

export default {
  name: "CustomerSpace",
  components: {
    AdaptFooterBackground,
    Table,
  }
}
</script>