<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar
        :buttons="true"
        :text1="'Inscription'"
        :text2="'Connexion'"
        :src1="'/signUp'"
        :src2="'/signIn'"
    />
  </AdaptFooterBackground>
</template>

<script>
// @ is an alias to /src
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";

export default {
  name: 'HomeView',
  components: {
    AdaptFooterBackground,
    Navbar
  }
}
</script>
