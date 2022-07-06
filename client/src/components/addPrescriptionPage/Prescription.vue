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

  <Modal
      v-show="showModalError"
      @button1Click="closeModalError"
      :icon="'fa-warning'"
      :iconClass="'text-ord-red'"
      :textModal="'L\'ordonnance ne peut pas être vide'"
      :text1="'Ok'"
      :class1="'ord-button-red hover:ord-button-red-hover'"
  />
  <Modal
      v-show="showModalSuccess"
      @button1Click="closeModalSuccess"
      :icon="'fa-check'"
      :iconClass="'text-ord-green-100'"
      :textModal="'Ordonnance créée avec succès'"
      :text1="'Continuer'"
      :class1="'ord-button-green hover:ord-button-green-hover'"
  />
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
import Modal from "@/components/globalComponents/Modal";

export default {
  name: 'Prescription',
  components: {
    Treatment,
    WhiteBoard,
    Button,
    ButtonIcon,
    Modal
  },
  data() {
    return {
      treatmentList: [],
      medicalAdvices: '',
      idPatientAccount: sessionStorage.getItem('patientAccountIDforNewPrescription'),
      showModalError: false,
      showModalSuccess: false,
      prescriptionID: '',
    }
  },
  methods: {
    addPrescription() {
      fetch('http://localhost:8081/prescription/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('WebToken')
        },
        body: JSON.stringify({
          idPatientAccount: this.idPatientAccount,
          medicalAdvices: this.medicalAdvices,
          treatments: this.treatmentList
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.result)
        if (data.result !== "noDataReceived") {
          this.showModalSuccess = true;
          this.prescriptionID = data.result;
        } else if (data.result === "noDataReceived") {
          this.showModalError = true;
        } else {
          console.log(data.result);
        }
      })
    },
    closeModalSuccess() {
      this.showModalSuccess = false;
      this.$router.push("/prescription");
      sessionStorage.setItem('prescriptionID', this.prescriptionID);
      sessionStorage.removeItem('patientAccountIDforNewPrescription');
    },
    closeModalError() {
      this.showModalError = false;
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
