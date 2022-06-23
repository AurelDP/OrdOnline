<template>
  <div class="bg ord-background-gradient">
    <RegisterForm></RegisterForm>
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm";

export default {
  name: "RegisterView",
  components: {RegisterForm}
}
</script>

<style scoped>
.bg {
  width: 1920px;
}
</style>