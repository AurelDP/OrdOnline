<template>
  <div class="w-screen">
    <div class="md:p-14 sm:p-10 p-6 my-20 md:mx-44 sm:mx-24 mx-12 bg-white shadow-lg">
      <h1 class="ord-text-title text-center">{{ title }}</h1>
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