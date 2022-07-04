<template>
  <li class="my-5 py-1 border-b-2">
    <div class="flex flex-wrap justify-between">
      <p class="mr-4 font-bold">{{ name }}</p>
      <p class="italic">
        <span v-if="isSubstitutable === true">Substituable</span>
        <span v-else>Non Substituable</span>
        <span v-if="isReimbursable === true">, Remboursable</span>
        <span v-else>, Non Remboursable</span>
      </p>
    </div>
    <p class="mt-3">{{ description }}</p>
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
    isSubstitutable: Boolean,
    isReimbursable: Boolean,
    renewal: String,
    isDelivered: Boolean
  },
}
</script>

<style scoped>

</style>