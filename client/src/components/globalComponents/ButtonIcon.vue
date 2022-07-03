<template>
  <router-link :to=src class="transition ord-button-icon">
    <font-awesome-icon :icon="icon"/>
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