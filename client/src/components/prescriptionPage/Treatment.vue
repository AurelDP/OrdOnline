<template>
  <li class="my-5 py-1 border-b-2">
    <div class="flex flex-wrap">
      <p class="w-full md:w-1/2">{{ name }}</p>
      <div class="flex w-full md:w-1/2">
        <p v-if="isNotSubstitutable === true">Non Substituable</p>
        <p v-else>Substituable</p>
        <p v-if="isNotSubstitutable === true">, Non Remboursable</p>
        <p v-else>, Remboursable</p>
      </div>
    </div>
    <p>{{ description }}</p>
    <div class="flex flex-wrap">
      <p class="w-full md:w-1/2">{{ renewal }}</p>
      <div class="w-full md:w-1/2 md:text-right">
        <label for="delivered" class="mr-5">Delivré</label>
        <input type="checkbox" id="delivered" name="delivered" :checked="isDelivered"/>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "Treatment",
  props: {
    name: String,
    description: String,
    isNotSubstitutable: Boolean,
    isNotReimbursable: Boolean,
    renewal: String,
    isDelivered: Boolean
  },
}
</script>

<style scoped>

</style>