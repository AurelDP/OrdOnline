<template>
  <WhiteBoard title="Informations Patient">
    <RegisterForm/>
  </WhiteBoard>
</template>

<script>
import WhiteBoard from "@/components/globalComponents/WhiteBoard";
import RegisterForm from "@/components/registerPage/RegisterForm";

export default {
  name: "RegisterView",
  components: {RegisterForm, WhiteBoard}
}
</script>

<style scoped>

</style>