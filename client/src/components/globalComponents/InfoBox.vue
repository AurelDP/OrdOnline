<template>
  <h3 class="ord-text-subtitle mb-5">{{ title }}</h3>
  <div v-if="borderLeft === true" class="ord-green-border-left mb-10">
    <slot/>
  </div>
  <div v-else class="mb-10">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "InfoBox",
  props: {
    title: String,
    borderLeft: Boolean,
  }
}
</script>

<style scoped>

</style>