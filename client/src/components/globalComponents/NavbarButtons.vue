<template>
  <div class="flex flex-row flex-wrap justify-center gap-x-7">
    <Button
        :text=text1
        :src=src1
        class="ord-button-green hover:ord-button-green-hover"
    />
    <Button
        :text=text2
        :src=src2
        class="ord-button-lightgreen hover:ord-button-lightgreen-hover"
    />
  </div>
</template>

<script>
import Button from "@/components/globalComponents/Button";

export default {
  name: "NavbarButtons.vue",
  props: {
    text1: String,
    text2: String,
    src1: String,
    src2: String
  },
  components: {
    Button
  }
}
</script>

<style scoped>

</style>