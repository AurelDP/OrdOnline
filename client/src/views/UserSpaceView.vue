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
      <PatientSpace v-if="role === 'patient'" />
      <DoctorSpace v-if="role === 'doctor'"/>
      <PharmaSpace v-if="role === 'pharma'"/>
    </div>
  </AdaptFooterBackground>
</template>

<script>
import AdaptFooterBackground from "@/components/globalComponents/AdaptFooterBackground";
import Navbar from "@/components/globalComponents/Navbar";
import PatientSpace from "@/components/userSpace/PatientSpace";
import DoctorSpace from "@/components/userSpace/DoctorSpace";
import PharmaSpace from "@/components/userSpace/PharmaSpace";

export default {
  name: "UserSpace",
  components: {
    AdaptFooterBackground,
    Navbar,
    PatientSpace,
    DoctorSpace,
    PharmaSpace
  },
  data() {
    return {
      role: localStorage.getItem('Role'),
    };
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