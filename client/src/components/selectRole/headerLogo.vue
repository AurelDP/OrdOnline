<template>
  <img class="mx-auto md:max-w-md mb-10 hover:cursor-pointer" src="@/assets/headerLogo/banniere.svg" alt="banniere" @click="goToHome()"/>
</template>

<script>
export default {
  name: "headerLogo",
  methods:{
    goToHome()
    {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>