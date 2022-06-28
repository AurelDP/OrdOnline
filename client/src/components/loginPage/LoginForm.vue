<template>
  <form class="m-5">
    <div class="flex flex-wrap -mx-3 -mb-6 py-5">
      <input
          class="border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
          id="grid-email"
          type="text"
          placeholder="Adresse mail"
          v-model="email"
          :class="{ 'border-ord-red focus:border-ord-red': emailIsNotValid }"
      />
      <div class="text-ord-red" v-show="emailIsNotValid">L'adresse email n'est pas valide.</div>
    </div>
    <div class="flex flex-wrap -mx-3 -mb-6 py-5">
      <input
          class="border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
          id="grid-password"
          type="password"
          placeholder="Mot de passe"
          v-model="password"
          :class="{ 'border-ord-red focus:border-ord-red': passwordIsNotValid }"
      />
      <div class="text-ord-red" v-show="passwordIsNotValid">Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.</div>
    </div>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      emailIsNotValid: false,
      passwordIsNotValid: false,
    };
  },
  watch: {
    email: function() {
      this.emailIsNotValid = !/^[a-zA-Z\u00E0-\u00FC\d_.+-]+@[a-zA-Z\u00E0-\u00FC\d-]+\.[a-zA-Z\u00E0-\u00FC\d-.]+$/.test(this.email);
    },

    password: function() {
      this.passwordIsNotValid = !/^(?=.*[A-Za-z\u00E0-\u00FC])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\u00E0-\u00FC\d@$!%*#?&]{8,}$/.test(this.password);
    },
  }
}
</script>

<style scoped>
</style>