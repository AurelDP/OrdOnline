<template>
  <div>
    <div class="flex flex-wrap gap-5 mb-5 justify-between items-center">
      <span :class=classTitle>
        {{ title }}
      </span>

      <div class="flex flex-row flex-wrap">
        <Button v-if="button === true" class="ord-button-green hover:ord-button-green-hover mr-3 md:flex hidden" :text="btnText" :src="''" @click="this.$emit('buttonClick');" />
        <ButtonIcon v-if="button === true" class="ord-button-green hover:ord-button-green-hover mr-3 md:hidden flex" :icon="'fa-plus'" :src="''" />
        <div v-if="research === true" class="my-auto">
          <div class="flex flex-row items-center ord-input focus-within:border-ord-green-100">
            <input
                class="focus:outline-none"
                type="text"
                placeholder="Rechercher"
                v-model="searchString"
            />
            <font-awesome-icon icon="fa-magnifying-glass" class="w-4 transition hover:text-ord-green-100 hover:cursor-pointer" @click="search"/>
          </div>
        </div>
      </div>
    </div>

    <slot/>

    <div class="max-h-60 overflow-auto shadow-no-offset rounded-lg bg-white">
      <table class="w-full">
        <tr
            v-if="dataDisplayed.length !== 0"
            v-for="value in dataDisplayed"
            class="border-b-2 hover:bg-ord-green-600 hover:cursor-pointer"
            @click="this.$emit('getClickValue', value[Object.keys(value)[0]]);"
        >
          <td class="p-3 whitespace-nowrap">{{ value[Object.keys(value)[1]] }}</td>
          <td class="p-3 whitespace-nowrap">{{ value[Object.keys(value)[2]] }}</td>
          <td v-if="value[Object.keys(value)[3]] === 'En attente'" class="p-3 pr-8 whitespace-nowrap text-right text-ord-lightred">{{ value[Object.keys(value)[3]] }}</td>
          <td v-else-if="value[Object.keys(value)[3]] === 'En cours'" class="p-3 pr-8 whitespace-nowrap text-right text-ord-green-100">{{ value[Object.keys(value)[3]] }}</td>
          <td v-else class="p-3 pr-8 whitespace-nowrap text-right">{{ value[Object.keys(value)[3]] }}</td>
        </tr>
        <NoDataTable v-else/>
      </table>
    </div>
  </div>
</template>

<script>

import Button from "@/components/globalComponents/Button";
import ButtonIcon from "@/components/globalComponents/ButtonIcon";
import NoDataTable from "@/components/globalComponents/Table/NoDataTable";

export default {
  name: "Table",
  components: {
    Button,
    ButtonIcon,
    NoDataTable
  },
  props: {
    title: String,
    btnText: String,
    classTitle: String,
    research: Boolean,
    button: Boolean,
    data: {}
  },
  data() {
    return {
      searchString: "",
      dataDisplayed: this.data,
    };
  },
  methods: {
    search() {
      this.dataDisplayed = this.data.filter(
        (value) =>
          value[Object.keys(value)[1]]
            .toLowerCase()
            .includes(this.searchString.toLowerCase()) ||
          value[Object.keys(value)[2]]
            .toLowerCase()
            .includes(this.searchString.toLowerCase()) ||
          value[Object.keys(value)[3]]
              .toLowerCase()
              .includes(this.searchString.toLowerCase())
      );
    }
  },
  watch: {
    searchString: function() {
      if (this.searchString === "")
        this.dataDisplayed = this.data;
    }
  }
}
</script>

<style scoped>
.shadow-no-offset {
  box-shadow: 0 0 7px rgb(0 0 0 / 0.3), 0 0 15px rgb(0 0 0 / 0.1);
}
</style>