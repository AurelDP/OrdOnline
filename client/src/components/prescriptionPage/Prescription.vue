<template>
  <InfoBox :title="'Médecin'" :borderLeft="true">
    <p>{{ this.doctor.lastName }} {{ this.doctor.firstName }}</p>
  </InfoBox>
  <InfoBox :title="'Patient'" :borderLeft="true">
    <p>{{ this.patient.lastName }} {{ this.patient.firstName }}, [âge si renseigné], [poids si renseigné]</p>
  </InfoBox>
  <InfoBox :title="'Traitements (' + this.treatments.length + ')'">
    <ul>
      <Treatment
        v-for="treatment in treatments"
        :name="treatment.name"
        :description="treatment.description"
        :isSubstitutable="treatment.substitutable"
        :isReimbursable="treatment.reimbursable"
        :renewal="treatment.renew"
        :isDelivered="treatment.isDelivery"
      />
    </ul>
  </InfoBox>
  <InfoBox :title="'Conseils médicaux'" :borderLeft="true">
    <p>{{ this.medicalAdvices }}</p>
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
  data() {
    return {
      name: "",
      description: "",
      medicalAdvices: "",
      patient: {
        lastName: "",
        firstName: "",
      },
      doctor: {
        lastName: "",
        firstName: "",
      },
      treatments: [],
      statuses: []
    }
  },
  methods: {
    getPrescription() {
      fetch(BASE_URL + "prescription/11", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
          .then(response => response.json())
          .then(data => {
            this.name = data.result.name;
            this.description = data.result.description;
            this.patient = data.result.patient;
            this.doctor = data.result.doctor;
            this.treatments = data.result.treatments;
            this.medicalAdvices = data.result.medicalAdvices;
          })
          .catch(error => {
            console.log(error);
          });
    },
  },
  created() {
    this.getPrescription();
  }
}
</script>

<style scoped>
</style>