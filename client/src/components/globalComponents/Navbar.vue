<template>
  <nav class="min-h-16 py-4 ord-px-adapt flex items-center justify-between bg-ord-green-600">
    <NavbarBanner/>
    <NavbarButtons
        v-if="buttons === true"
        :text1=text1
        :text2=text2
        :icon1=icon1
        :icon2=icon2
        :src1=src1
        :src2=src2
        @button1Click="this.$emit('button1Click')"
        @button2Click="this.$emit('button2Click')"
    />
  </nav>
</template>

<script>
import NavbarButtons from "@/components/globalComponents/NavbarButtons";
import NavbarBanner from "@/components/globalComponents/NavbarBanner";

export default {
  name: "Navbar.vue",
  components: {
    NavbarButtons,
    NavbarBanner
  },
  props: {
    buttons: Boolean,
    text1: String,
    text2: String,
    icon1: String,
    icon2: String,
    src1: String,
    src2: String,
  }
}
</script>

<style scoped>
.min-h-16 {
  min-height: 4rem;
}
</style>