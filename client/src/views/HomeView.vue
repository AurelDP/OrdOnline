<template>
  <AdaptFooterBackground :backgroundGradient="false">
    <Navbar
        :buttons="true"
        :text1="'Inscription'"
        :text2="'Connexion'"
        :src1="'/signUp'"
        :src2="'/signIn'"
    />
    <HomeBody
      :isConnected="false"
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
  }
}
</script>
