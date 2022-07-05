<template>
  <InfoBox :title="'Médecin'" :borderLeft="true">
    <p>{{ this.prescription.doctor.lastName }} {{ this.prescription.doctor.firstName }}, {{ this.prescription.doctor.address }}</p>
  </InfoBox>
  <InfoBox :title="'Patient'" :borderLeft="true">
    <p>{{ this.prescription.patient.lastName }} {{ this.prescription.patient.firstName }}</p>
    <p v-if="this.prescription.patient.age !== null">{{ this.prescription.patient.age }} ans</p>
    <p v-if="this.prescription.patient.weight !== null">{{ this.prescription.patient.weight }} kg</p>
  </InfoBox>
  <InfoBox :title="'Traitements (' + this.prescription.treatments.length + ')'">
    <ul>
      <Treatment
        v-for="treatment in prescription.treatments"
        :id="treatment.id"
        :name="treatment.name"
        :description="treatment.description"
        :isSubstitutable="treatment.substitutable"
        :isReimbursable="treatment.reimbursable"
        :renewal="treatment.renew"
        :isDelivered="treatment.isDelivery"
        :role="role"
        @delivery="actualiseDelivery"
      />
    </ul>
  </InfoBox>
  <InfoBox :title="'Conseils médicaux'" :borderLeft="true">
    <p>{{ this.prescription.medicalAdvices }}</p>
  </InfoBox>
</template>

<script>
import Treatment from "@/components/prescriptionPage/Treatment";
import InfoBox from "@/components/globalComponents/InfoBox";

const BASE_URL = "http://localhost:8081/";
export default {
  name: "Prescription",
  components: {
    Treatment,
    InfoBox,
  },
  props: {
    prescription: {
      name: String,
      description: String,
      medicalAdvices: String,
      patient: {
        lastName: String,
        firstName: String,
        age: Number,
        weight: Number,
      },
      doctor: {
        lastName: String,
        firstName: String,
        address: String,
      },
      treatments: [],
      statuses: []
    },
    role: String
  },
  methods: {
    actualiseDelivery(delivery) {
      this.$emit("delivery", delivery);
    }
  }
}
</script>

<style scoped>
</style>