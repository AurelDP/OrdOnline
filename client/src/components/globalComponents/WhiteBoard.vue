<template>
  <div class="w-screen">
    <div class="md:p-14 sm:p-10 p-6 md:m-44 sm:m-24 m-12 bg-white shadow-lg">
      <h1 class="text-3xl font-bold ord-dark-blue">{{ title }}</h1>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "WhiteBoard",
  props: {
    title: String,
  }
}
</script>

<style scoped>

</style>