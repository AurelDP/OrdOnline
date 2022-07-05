<template>
  <AdaptFooterBackground>
    <Navbar
        :buttons="true"
        :text1="'Mes infos'"
        :text2="'Déconnexion'"
        :icon1="'fa-info'"
        :icon2="'fa-arrow-right-from-bracket'"
        :src1="'/infoUser'"
        :src2="'/'"
        @button2Click="disconnect"
    />
    <div class="md:px-24 sm:px-16 px-8 py-10">
      <Table :btn="false" :research="true" src="/" class-title="ord-text-title mr-2" :title="'Mes ordonnances'" :type="'my_prescription'" class="mb-10"/>
      <Table :btn="true" :research="true" src="/" class-title="ord-text-title mr-2" :title="'Mes médecins'" :type="'my_doctor'" class="mb-10"/>
      <Table :btn="true" :research="true" src="/" class-title="ord-text-title mr-2" :title="'Mes pharmacies'" :type="'my_pharmacy'" class="mb-10"/>
    </div>
  </AdaptFooterBackground>
</template>

<script>
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";
import Table from "@/components/globalComponents/Table/Table";

export default {
  name: "PatientSpace",
  components: {
    AdaptFooterBackground,
    Table,
    Navbar,
  },
  methods: {
    disconnect() {
      localStorage.removeItem("WebToken");
    }
  }
}
</script>