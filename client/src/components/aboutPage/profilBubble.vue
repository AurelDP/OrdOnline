<template>
  <div class="self-center">
    <div class="flex items-center justify-center bg-ord-green-600 w-56 h-56 rounded-full shadow-xl bg-opacity-50">
      <img class="w-52 h-52" v-bind:src="path" alt="Secure image">
    </div>
    <h1 class="mt-6 ord-text-subtitle-bold text-center">
      {{blackWord}}<br>
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    blackWord: String,
    path: String
  }
}
</script>

<style>
</style>