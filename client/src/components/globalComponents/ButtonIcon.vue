<template>
  <router-link :to=src class="transition ord-button-icon">
    <font-awesome-icon :icon="icon" class="w-2/3"/>
  </router-link>
</template>

<script>
export default {
  name: "ButtonIcon",
  props: {
    icon: String,
    src: String
  }
}
</script>

<style scoped>

</style>