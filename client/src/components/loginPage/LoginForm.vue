<template>
  <form class="m-5" @submit="login">
    <div class="flex flex-wrap -mx-3 -mb-6 py-5">
      <input
          class="ord-input"
          id="grid-email"
          type="text"
          placeholder="Adresse mail"
          v-model="email"
          :class="{ 'border-ord-red focus:border-ord-red': emailIsNotValid }"
          required
      />
      <div class="text-ord-red" v-show="emailIsNotValid">L'adresse email n'est pas valide.</div>
    </div>
    <div class="flex flex-wrap -mx-3 -mb-6 py-5">
      <input
          class="ord-input"
          id="grid-password"
          type="password"
          placeholder="Mot de passe"
          v-model="password"
          :class="{ 'border-ord-red focus:border-ord-red': passwordIsNotValid }"
          required
      />
      <div class="text-ord-red" v-show="passwordIsNotValid">Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.</div>
    </div>
    <div class="ord-whiteboard-buttons">
      <button class="ord-button ord-button-green hover:ord-button-green-hover transition" type="submit">
        Continuer
      </button>
    </div>
  </form>

  <Modal
      v-show="showModalError"
      @button1Click="closeModalError"
      :icon="'fa-warning'"
      :iconClass="'text-ord-red'"
      :textModal="'Adresse mail ou mot de passe incorrect'"
      :text1="'Ok'"
      :class1="'ord-button-red hover:ord-button-red-hover'"
  />
  <Modal
      v-show="showModalSuccess"
      @button1Click="closeModalSuccess"
      :icon="'fa-check'"
      :iconClass="'text-ord-green-100'"
      :textModal="'Connexion avec succès'"
      :text1="'Continuer'"
      :class1="'ord-button-green hover:ord-button-green-hover'"
  />
</template>

<script>
import Modal from '../globalComponents/Modal.vue'
const BASE_URL = "http://localhost:8081/";

export default {
  name: "LoginForm",
  components: {
    Modal
  },
  data() {
    return {
      email: "",
      password: "",
      emailIsNotValid: false,
      passwordIsNotValid: false,
      showModalError: false,
      showModalSuccess: false,
    };
  },
  methods: {
    login(e) {
      fetch(BASE_URL + "users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response.result !== "Invalid email or password" && response.result !== "error") {
          localStorage.setItem("WebToken", response.result.WebToken);
          localStorage.setItem("Role", response.result.Role);
          this.showModalSuccess = true;
        } else {
          this.showModalError = true;
        }
      })
      e.preventDefault();
    },
    closeModalError() {
      this.showModalError = false;
    },
    closeModalSuccess() {
      this.showModalSuccess = false;
      this.$router.push("/");
    },
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