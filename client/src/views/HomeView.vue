<template>
  <AdaptFooterBackground :backgroundGradient="false">
    <Navbar v-if="!isConnected"
        :buttons="true"
        :text1="'Inscription'"
        :text2="'Connexion'"
        :icon1="'fa-user-plus'"
        :icon2="'fa-arrow-right-to-bracket'"
        :src1="'/signUp'"
        :src2="'/signIn'"
    />
    <Navbar v-if="isConnected"
        :buttons="true"
        :text1="'Mon espace'"
        :text2="'Déconnexion'"
        :icon1="'fa-user'"
        :icon2="'fa-arrow-right-from-bracket'"
        :src1="'/userSpace'"
        :src2="'/'"
        @button2Click="disconnect"
    />
    <HomeBody
      :isConnected="isConnected"
    />
  </AdaptFooterBackground>
</template>

<script>
// @ is an alias to /src
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";
import HomeBody from "@/components/homePage/HomeBody";

export default {
  name: 'HomeView',
  components: {
    AdaptFooterBackground,
    Navbar,
    HomeBody
  },
  data() {
    return {
      isConnected: false
    }
  },
  methods: {
    disconnect() {
      localStorage.removeItem("WebToken");
      sessionStorage.removeItem("prescriptionID");
      sessionStorage.removeItem("patientAccountIDforNewPrescription");
      this.isConnected = false;
    }
  },
  created() {
      if (localStorage.getItem('WebToken') !== null)
        this.isConnected = true;
  }
}
</script>
