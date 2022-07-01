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
    <Traitement v-for="(item, index) in treatmentList"
                :is="item.type"
                :id="index"
                :name="item.name"
                v-bind:desription="item.description"
                v-bind:isSubstitutable="item.isSubstitutable"
                v-bind:isReimbursable="item.isReimbursable"
                v-bind:renewal="item.renewal"
                v-bind:isDelivered="item.isDelivered"
                v-bind:index="index"
                @delete-medicament="deleteMedicament"
    >
    </Traitement>
    <textarea
        class="resize-none border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
        id="coneilsMedicaux"
        placeholder="Conseils médicaux"
        rows="3"
    />
  </WhiteBoard>
</template>

<script>

let item = {
  id: '',
  name: 'bob',
  description: '',
  isSubstitutable: false,
  isReimbursable: false,
  renewal: '',
  isDelivered: false
}
let count = 1

import WhiteBoard from "@/components/globalComponents/WhiteBoard";
import Traitement from "@/components/ordonnance/Traitement";
import Button from "@/components/globalComponents/Button";

export default {
  name: 'Ordonnance',
  components: {
    Traitement,
    WhiteBoard,
    Button,
  },

  data() {
    return {
      treatmentList: [],
    }
  },

  methods: {
    addTreatement() {
      item.id = count;
      this.treatmentList.push({item});
      count++;
    },

    deleteMedicament(e) {
      console.log(e);
      console.log("id", this.treatmentList[0].id);
      console.log("name", this.treatmentList[0].name)
      for( let i = 0; i < this.treatmentList.length; i++){
        if (this.treatmentList[i].id === e) {
          this.treatmentList.splice(this.treatmentList[i], 1);
        }
      }
    }
  }
}
</script>
