<template>
  <WhiteBoard
      :title="'Nouvelle ordonnance'"
      :button1="true"
      :text1="'Confirmer'"
      :src1="'/'"
      :class1="'ord-button-green hover:ord-button-green-hover'"
  >
    <div class="flex justify-between">
      <h2 class=" ord-text-subtitle">Traitements</h2>
      <Button
          class="ord-button-green hover:ord-button-green-hover"
          :text="'Ajouter'"
          :src="''"
          @click="addTreatement"
      />
    </div>
    <Treatment v-for="treatment in treatmentList"
                :id="treatment.id"
                @deleteTreatment="deleteTreatment"
                @updateName="updateTreatmentName"
                @updateDescription="updateTreatmentDescription"
                @updateIsSubstitutable="updateTreatmentIsSubstitutable"
                @updateIsReimbursable="updateTreatmentIsReimbursable"
                @updateRenewal="updateTreatmentRenewal"
    />
    <textarea
        class="resize-none border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
        id="coneilsMedicaux"
        placeholder="Conseils médicaux"
        rows="3"
        v-model="medicalAdvices"
    />
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

export default {
  name: 'Prescription',
  components: {
    Treatment,
    WhiteBoard,
    Button,
  },
  data() {
    return {
      treatmentList: [],
      medicalAdvices: '',
    }
  },
  methods: {
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
        if (this.treatmentList[i].id === id) {
          console.log(this.treatmentList[i].name);
          this.treatmentList[i].name = name;
          console.log(this.treatmentList[i].name);
        }
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
    }
  },
  created() {
    this.addTreatement();
  }
}
</script>
