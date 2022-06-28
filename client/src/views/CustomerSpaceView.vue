<template>
  <AdaptFooterBackground>
    <div class="md:px-24 sm:px-16 px-8 py-10">
      <Table :btn="true" :research="true" :title="'Mes ordonnances'" :col3="true"></Table>
      <Table :btn="false" :research="false" :title="'Mes medecins'" :col3="false"></Table>
    </div>
  </AdaptFooterBackground>
</template>

<script>

import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Table from "@/components/globalComponents/Table";

export default {
  name: "CustomerSpace",
  components: {
    AdaptFooterBackground,
    Table,
  }
}
</script>

<style scoped>

</style>