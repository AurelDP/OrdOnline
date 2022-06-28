<template>
  <form class="m-5">
    <div class="flex flex-wrap -mx-3 -mb-6 py-5">
      <input
          class="border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
          id="grid-email"
          type="text"
          placeholder="Adresse mail"
      />
    </div>
    <div class="flex flex-wrap -mx-3 -mb-6 py-5">
      <input
          class="border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
          id="grid-password"
          type="password"
          placeholder="Mot de passe"
      />
    </div>
  </form>
</template>

<script>
export default {
  name: "LoginForm"
}
</script>

<style scoped>
.min-w-56 {
  min-width: 14rem;
}

.min-w-40 {
  min-width: 10rem;
}
</style>