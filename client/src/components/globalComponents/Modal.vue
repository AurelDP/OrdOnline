<template>
  <div
      class="flex justify-center items-center bg-ord-dark-blue bg-opacity-70 fixed top-0 left-0 z-50 w-full h-full">
    <div class="bg-white rounded-lg shadow h-fit p-4 w-full max-w-md">
      <div class="p-6 text-center">
        <font-awesome-icon :icon="icon" class="h-12" :class="iconClass"/>
        <h3 class="ord-text-subtitle mt-5">{{ textModal }}</h3>
        <div class="ord-whiteboard-buttons">
          <Button
              @click="this.$emit('button1Click')"
              :text="text1"
              :src="''"
              :class="class1"
          />
          <Button
              v-if="text2"
              @click="this.$emit('button2Click')"
              :text="text2"
              :src="''"
              :class="class2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue'

export default {
  name: "Modal",
  components: {
    Button
  },
  props: {
    icon: String,
    iconClass: String,
    textModal: String,
    text1: String,
    class1: String,
    text2: String,
    class2: String,
  }
}
</script>

<style scoped>

</style>