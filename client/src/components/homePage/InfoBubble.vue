<template>
  <div class="self-center">
    <div class="flex justify-center bg-ord-green-600 w-64 h-64 rounded-full shadow-xl bg-opacity-50">
      <img class="w-48" v-bind:src="path" alt="Secure image">
    </div>
    <h1 class="mt-6 ord-text-subtitle-bold text-center">
      {{blackWord}}<br>
      <span class="text-ord-green-200">{{ greenWord }}</span>
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    blackWord: String,
    greenWord: String,
    path: String
  }
}
</script>

<style>
</style>