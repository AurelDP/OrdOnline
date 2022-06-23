<template>
  <nav class="min-h-16 py-4 ord-px-adapt flex items-center justify-between bg-ord-green-600">
    <NavbarBanner/>
    <NavbarButtons
        v-if="buttons === true"
        v-bind:text1=text1
        v-bind:text2=text2
        v-bind:src1=src1
        v-bind:src2=src2
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
    src1: String,
    src2: String
  }
}
</script>

<style scoped>
.min-h-16 {
  min-height: 4rem;
}
</style>