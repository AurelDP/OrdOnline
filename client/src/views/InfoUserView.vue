<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar
        :buttons="true"
        :text1="'Mon espace'"
        :text2="'Déconnexion'"
        :icon1="'fa-user'"
        :icon2="'fa-arrow-right-from-bracket'"
        :src1="'/userSpace'"
        :src2="'/'"
        @button2Click="disconnect"
    />
    <InfoUser/>
  </AdaptFooterBackground>
</template>

<script>
// @ is an alias to /src
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";
import InfoUser from "@/components/infoUserPage/InfoUser";

export default {
  name: 'InfoUserView',
  components: {
    AdaptFooterBackground,
    Navbar,
    InfoUser
  },
  methods: {
    disconnect() {
      localStorage.removeItem("WebToken");
      sessionStorage.removeItem("prescriptionID");
      sessionStorage.removeItem("patientIDforNewPrescription");
      sessionStorage.removeItem("patientIDforRecord");
    }
  }
}
</script>
