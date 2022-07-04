<template>
  <div class="flex flex-row flex-wrap justify-center gap-x-7">
    <Button
        :text=text1
        :src=src1
        class="ord-button-green hover:ord-button-green-hover sm:flex hidden"
    />
    <ButtonIcon
        :icon=icon1
        :src=src1
        class="ord-button-green hover:ord-button-green-hover sm:hidden flex"
    />
    <Button
        :text=text2
        :src=src2
        class="ord-button-lightgreen hover:ord-button-lightgreen-hover sm:flex hidden"
    />
    <ButtonIcon
        :icon=icon2
        :src=src2
        class="ord-button-lightgreen hover:ord-button-lightgreen-hover sm:hidden flex"
    />
  </div>
</template>

<script>
import Button from "@/components/globalComponents/Button";
import ButtonIcon from "@/components/globalComponents/ButtonIcon";

export default {
  name: "NavbarButtons.vue",
  props: {
    text1: String,
    text2: String,
    icon1: String,
    icon2: String,
    src1: String,
    src2: String
  },
  components: {
    Button,
    ButtonIcon
  }
}
</script>

<style scoped>

</style>