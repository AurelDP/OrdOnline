<template>
  <div class="self-center">
    <div v-bind:class="taille">
      <img v-bind:class="imageSize" v-bind:src="path" alt="Secure image">
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
    path: String,
    imageSize : String,
    bubbleSize : String
  },

  data(){
    return {
      taille:""
    }
  },

  created() {
    this.taille = "flex items-center justify-center bg-ord-green-600 rounded-full shadow-xl bg-opacity-50 "+this.bubbleSize
  }
}
</script>

<style>
</style>