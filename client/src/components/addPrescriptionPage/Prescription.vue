<template>
  <WhiteBoard
      :title="'Nouvelle ordonnance'"
  >
    <div class="flex justify-between flex-wrap">
      <h3 class="ord-text-subtitle mb-5">Traitements</h3>
      <Button
          class="ord-button-green hover:ord-button-green-hover md:flex hidden"
          :text="'Ajouter'"
          :src="''"
          @click="addTreatement"
      />
      <ButtonIcon
          class="ord-button-green hover:ord-button-green-hover md:hidden flex"
          :icon="'fa-plus'"
          :src="''"
          @click="addTreatement"
      />
    </div>
    <Treatment v-for="treatment in treatmentList"
               :key="treatment.id"
               :id="treatment.id"
               @deleteTreatment="deleteTreatment"
               @updateName="updateTreatmentName"
               @updateDescription="updateTreatmentDescription"
               @updateIsSubstitutable="updateTreatmentIsSubstitutable"
               @updateIsReimbursable="updateTreatmentIsReimbursable"
               @updateRenewal="updateTreatmentRenewal"
    />
    <textarea
        class="resize-none ord-input"
        id="coneilsMedicaux"
        placeholder="Conseils médicaux"
        rows="3"
        v-model="medicalAdvices"
    />
    <div class="ord-whiteboard-buttons">
      <Button
          class="ord-button-green hover:ord-button-green-hover"
          :text="'Confirmer'"
          :src="'/addPrescription'"
          @click="addPrescription"
      />
      <Button
          class="ord-button-green hover:ord-button-green-hover"
          :text="'Retour'"
          :src="'/patientRecord'"
          @click="removeSessionStorage"
      />
    </div>
  </WhiteBoard>
</template>

<script>

let item = {
  id: '',
  name: '',
  description: '',
  isSubstitutable: false,
  isReimbursable: false,
  renewal: '',
  isDelivered: false
}
let count = 1

import WhiteBoard from "@/components/globalComponents/WhiteBoard";
import Treatment from "@/components/addPrescriptionPage/Treatment";
import Button from "@/components/globalComponents/Button";
import ButtonIcon from "@/components/globalComponents/ButtonIcon";

export default {
  name: 'Prescription',
  components: {
    Treatment,
    WhiteBoard,
    Button,
    ButtonIcon
  },
  data() {
    return {
      treatmentList: [],
      medicalAdvices: '',
      idPatientAccount: sessionStorage.getItem('patientAccountIDforNewPrescription'),
    }
  },
  methods: {
    addPrescription() {
      fetch('http://localhost:8081/prescription/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          IDmedecin: 1,
          IDpatient: 2,
          medicalAdvices: this.medicalAdvices,
          treatments: this.treatmentList
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.result === "success") {
          this.$router.push("/");
        } else {
          console.log(data.result);
        }
      })
    },
    addTreatement() {
      item.id = count;
      this.treatmentList.push(Object.assign({}, item));
      count++;
    },
    deleteTreatment(e) {
      for (let i = 0; i < this.treatmentList.length; i++) {
        if (this.treatmentList[i].id === e)
          this.treatmentList.splice(i, 1);
      }
    },
    updateTreatmentName(id, name) {
      for (let i = 0; i < this.treatmentList.length; i++) {
        if (this.treatmentList[i].id === id)
          this.treatmentList[i].name = name;
      }
    },
    updateTreatmentDescription(id, description) {
      for (let i = 0; i < this.treatmentList.length; i++) {
        if (this.treatmentList[i].id === id)
          this.treatmentList[i].description = description;
      }
    },
    updateTreatmentIsSubstitutable(id, isSubstitutable) {
      for (let i = 0; i < this.treatmentList.length; i++) {
        if (this.treatmentList[i].id === id)
          this.treatmentList[i].isSubstitutable = isSubstitutable;
      }
    },
    updateTreatmentIsReimbursable(id, isReimbursable) {
      for (let i = 0; i < this.treatmentList.length; i++) {
        if (this.treatmentList[i].id === id)
          this.treatmentList[i].isReimbursable = isReimbursable;
      }
    },
    updateTreatmentRenewal(id, renewal) {
      for (let i = 0; i < this.treatmentList.length; i++) {
        if (this.treatmentList[i].id === id)
          this.treatmentList[i].renewal = renewal;
      }
    },
    removeSessionStorage() {
      sessionStorage.removeItem('patientAccountIDforNewPrescription');
    }
  },
  created() {
    if (sessionStorage.getItem('patientAccountIDforNewPrescription') === null)
      this.$router.push("/patientRecord");
    this.addTreatement();
  }
}
</script>
