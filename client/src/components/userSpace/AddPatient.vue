<template>
  <div class="ord-modal-background">
    <WhiteBoard title="Ajouter un patient">

      <h1 class="ord-text-subtitle py-4">Informations</h1>

      <div class="flex flex-row items-center ord-input focus-within:border-ord-green-100">
        <input
            class="focus:outline-none w-full"
            type="text"
            placeholder="Rechercher"
            v-model="searchString"
            id="search"
        />
        <font-awesome-icon icon="fa-magnifying-glass" class="w-4 transition hover:text-ord-green-100 hover:cursor-pointer" @click="search"/>
      </div>
      <label for="search" class="text-ord-red" v-if="invalidSearch">Veuillez entrer plus de 4 caractères.</label>

      <Table
          :title="'Patients trouvés'"
          class-title="ord-text-subtitle py-4"
          :data="dataPatients"
          :key="dataPatients"
          @getClickValue="clickedPatient"
          :only2Col="true"
      />

      <div class="ord-whiteboard-buttons">
        <Button
            :class="'ord-button-green hover:ord-button-green-hover'"
            :text="'Annuler'"
            :src="''"
            @click="this.$emit('clickedCloseAddPatient')"
        />
      </div>
    </WhiteBoard>
  </div>
</template>

<script>
import WhiteBoard from "@/components/globalComponents/WhiteBoard";
import Button from "@/components/globalComponents/Button";
import Table from "@/components/globalComponents/Table/Table";
import NoDataTable from "@/components/globalComponents/Table/NoDataTable";

const BASE_URL = "http://localhost:8081/";

export default {
  name: "AddPatient",
  components: {
    WhiteBoard,
    Button,
    Table,
    NoDataTable
  },
  emits: ["clickedCloseAddPatient", "addThisPatient"],
  data() {
    return {
      dataPatients: [],
      searchString: "",
      invalidSearch: false,
    };
  },
  methods: {
    search() {
      if (this.searchString.length > 4) {
        fetch(BASE_URL + "patient/getAllByParam", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("WebToken"),
          },
          body: JSON.stringify({
            search: this.searchString,
          })
        })
            .then(response => response.json())
            .then(data => {
              if (data.result === "noPatientFound")
                this.dataPatients = [];
              else if (data.result !== "error")
                this.dataPatients = data.result;
              else
                console.log("error");
            })
            .catch(error => {
              console.log(error);
            });
      }
    },
    clickedPatient(value) {
      this.$emit("addThisPatient", value);
      this.$emit("clickedCloseAddPatient");
    }
  },
  watch: {
    searchString: function() {
      this.invalidSearch = this.searchString.length <= 4 && this.searchString.length > 0;
    }
  }
}
</script>

<style scoped>

</style>