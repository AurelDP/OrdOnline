<template>
  <AdaptFooterBackground :backgroundGradient="true">
    <Navbar/>
    <Prescription/>
  </AdaptFooterBackground>
</template>

<script>
// @ is an alias to /src
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";
import Prescription from "@/components/addPrescriptionPage/Prescription";

export default {
  name: 'AddPrescriptionView',
  components: {
    AdaptFooterBackground,
    Navbar,
    Prescription
  }
}
</script>
