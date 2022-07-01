<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar/>
    <Ordonnance/>
  </AdaptFooterBackground>
</template>

<script>
// @ is an alias to /src
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";
import Ordonnance from "@/components/ordonnance/Ordonnance";

export default {
  name: 'OrdonanceView',
  components: {
    AdaptFooterBackground,
    Navbar,
    Ordonnance
  }
}
</script>
