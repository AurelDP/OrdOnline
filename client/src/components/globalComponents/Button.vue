<template>
  <router-link :to=src class="transition ord-button">
      {{text}}
  </router-link>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    src: String
  }
}
</script>

<style scoped>

</style>