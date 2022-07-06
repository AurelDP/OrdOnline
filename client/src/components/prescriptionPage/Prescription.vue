<template>
  <InfoBox :title="'Médecin'" :borderLeft="true">
    <p>{{ this.prescription.doctor.lastName }} {{ this.prescription.doctor.firstName }}, {{ this.prescription.doctor.address }}</p>
  </InfoBox>
  <InfoBox :title="'Patient'" :borderLeft="true">
    <p>
      {{ this.prescription.patient.lastName }} {{ this.prescription.patient.firstName }}
      <span v-if="this.prescription.patient.birthDate !== null">, né(e) le {{ this.prescription.patient.birthDate }}</span>
      <span v-if="this.prescription.patient.weight !== null">, {{ this.prescription.patient.weight }} kg</span>
    </p>
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
        :prescriptionStatus="statuses[0].status"
        @deliveryStatusActualisation="actualiseTreatmentDeliveryStatus"
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

export default {
  name: "Prescription",
  emits: ["deliveryStatusActualisation"],
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
      treatments: []
    },
    statuses: Array,
  },
  methods: {
    actualiseTreatmentDeliveryStatus(treatmentToActualiseId) {
      this.$emit("treatmentDeliveryStatusActualisation", treatmentToActualiseId);
    }
  }
}
</script>

<style scoped>
</style>