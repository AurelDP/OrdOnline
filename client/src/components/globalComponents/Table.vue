<template>
  <div>
    <div class="flex flex-wrap py-3 justify-between items-center">
      <span class="ord-text-title mr-2">
        {{ title }}
      </span>
      <div v-if="btn === true || research === true" class="flex flex-row my-5">
        <span v-if="btn === true">
          <Button class="ord-button-green mr-3" text="Ajouter" src="/"/>
        </span>
        <span v-if="research === true" class=" md:w-72 overflow-hidden">
            <input
                class="border-b-2 border-gray-400 focus:outline-none focus:border-ord-green-100 ml-3 w-full"
                type="text"
                placeholder="Research"
            />
          </span>
      </div>
    </div>
    <div class="max-h-72 overflow-auto drop-shadow-md my-5">
      <table class="w-full bg-white rounded-lg">
        <router-link to="/">
          <tr class="flex flex-nowrap border-b-2 hover:bg-ord-green-600 place-content-between items-center">
            <div>
              <td class="p-3 md:pr-16">14/06/2022</td>
              <td class="p-3 md:pl-16 whitespace-nowrap"> Docteur Chaumont</td>
            </div>
            <td v-if="col3 === true" class="py-3 px-8 text-right whitespace-nowrap">En cours</td>
          </tr>
        </router-link>

        <router-link to="/">
          <tr class="flex flex-nowrap border-b-2 hover:bg-ord-green-600 place-content-between items-center">
            <div>
              <td class="p-3 md:pr-16">14/06/2022</td>
              <td class="p-3 md:pl-16 whitespace-nowrap"> Docteur Chaumont</td>
            </div>
            <td v-if="col3 === true" class="py-3 px-8 text-right whitespace-nowrap">En cours</td>
          </tr>
        </router-link>

      </table>
    </div>
  </div>
</template>

<script>

import Button from "@/components/globalComponents/Button";

export default {
  name: "Table",
  components: {
    Button,
  },

  props: {
    title: String,
    btn: Boolean,
    research: Boolean,
    col3: Boolean,
  }
}
</script>