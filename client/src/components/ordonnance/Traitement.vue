<template>
  <div class="flex gap-5 my-10">
    <div class="w-1 bg-ord-green-100"/>
    <div class="flex-1">
      <div class="flex gap-2">
        <input
            class="border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
            id="nomMedicament"
            type="text"
            v-model="name"
            placeholder="Nom médicament"
        />
        <button @click="deleteMedicament(id)">
          <svg class="h-6 hover:fill-ord-red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/>
          </svg>
        </button>
      </div>

      <textarea
          class="my-5 resize-none border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
          id="description"
          placeholder="Description"
          rows="7"
          v-model = "description"
      />

      <div class="flex gap-10">
        <div class="flex gap-40">
          <div class="flex">
            <h3>Substituable</h3>
            <input
                class="self-center mx-5"
                type="checkbox"
                id="substituable"
                name="substituable"
                value="isSubstiutable"
                v-model = "isSubstitutable"
            />
          </div>
          <div class="flex">
            <h3>Remboursable</h3>
            <input
                class="self-center mx-5"
                type="checkbox"
                id="remboursable"
                name="remboursable"
                value="isReimbursable"
                v-model = "isReimbursable"
            />
          </div>
        </div>
        <input
            class="border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
            id="renouvellement"
            type="text"
            placeholder="Modalité renouvellement"
            v-model = "renewal"
        />
      </div>
      <p>{{id}}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Traitement',
  props: {
    id: Number,
    name: String,
    description: String,
    isSubstitutable: Boolean,
    isReimbursable: Boolean,
    renewal: String,
    isDelivered: Boolean
  },
  methods: {
    deleteMedicament(id) {
      this.$emit('delete-medicament', id)
    }
  }
}
</script>
