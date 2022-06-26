<template>
  <div class="w-screen">
    <div class="relative md:p-14 sm:p-10 p-6 my-20 md:mx-44 sm:mx-24 mx-12 bg-white shadow-lg">
      <div
          v-if="statut === true"
          :class=classStatut
          class="absolute md:-right-4 md:top-4 md:w-40 right-0 -top-10 w-full py-2 px-4 bg-white-gray text-xl shadow-lg"
      >
        <p>{{ textStatut }}</p>
      </div>
      <h1 class="ord-text-title text-center">{{ title }}</h1>
      <slot/>
      <div v-if="button1 === true || button2 === true" class="flex flex-row mt-12 flex-wrap justify-center gap-x-7 gap-y-2">
        <Button v-if="button1 === true"
          :class=class1
          :text=text1
          :src=src1
        />
        <Button v-if="button2 === true"
            :class=class2
            :text=text2
            :src=src2
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/globalComponents/Button";

export default {
  name: "WhiteBoard",
  props: {
    title: String,
    button1: Boolean,
    button2: Boolean,
    text1: String,
    text2: String,
    src1: String,
    src2: String,
    class1: String,
    class2: String,
    statut: Boolean,
    classStatut: String,
    textStatut: String,
  },
  components: {Button}
}
</script>

<style scoped>

</style>