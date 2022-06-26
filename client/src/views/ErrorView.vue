<template>
 <AdaptFooterBackground :backgroundGradient="true">
   <Navbar/>
   <div class="ord-py-adapt ord-px-adapt">
     <h1 class="font-bold text-ord-lightred text-5xl text-center">
       Oops... <br/>
       Cette page n'existe pas !
     </h1>
     <img src="../assets/iconError404.svg" class="h-60 w-60 mx-auto opacity-70 mt-20" alt="Image erreur 404"/>
   </div>
 </AdaptFooterBackground>
</template>

<script>
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";

export default {
  name: "Error.vue",
  components: {
    AdaptFooterBackground,
    Navbar
  }
}
</script>

<style scoped>

</style>