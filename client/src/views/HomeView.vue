<template>
  <AdaptFooterBackground v-bind:backgroundGradient="true">
    <Navbar
        v-bind:buttons="true"
        v-bind:text1="'Inscription'"
        v-bind:text2="'Connexion'"
        v-bind:src1="'/singUp'"
        v-bind:src2="'/signIn'"
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
