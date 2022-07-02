<template>
  <form class="m-5" @submit="register">
    <div class="flex flex-wrap -mx-3 -mb-6 py-5">
      <div class="w-full min-w-56 md:w-1/2 px-3">
        <input
          class="border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
          id="grid-last-name"
          type="text"
          placeholder="Nom"
          v-model="lastName"
          :class="{ 'border-ord-red focus:border-ord-red': lastNameIsNotValid }"
        />
        <div class="text-ord-red" v-show="lastNameIsNotValid">Le nom doit doit contenir uniquement des lettres et commencer par une majuscule.</div>
      </div>
      <div class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
            id="grid-first-name"
            type="text"
            placeholder="Prénom"
            v-model="firstName"
            :class="{ 'border-ord-red focus:border-ord-red': firstNameIsNotValid }"
        />
        <div class="text-ord-red" v-show="firstNameIsNotValid">Le prénom doit contenir uniquement des lettres et commencer par une majuscule.</div>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 -mb-6 py-5">
      <div class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
            id="grid-mail"
            type="email"
            placeholder="Adresse email"
            v-model="email"
            :class="{ 'border-ord-red focus:border-ord-red': emailIsNotValid }"
        />
        <div class="text-ord-red" v-show="emailIsNotValid">L'adresse email n'est pas valide.</div>
      </div>
      <div class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
            id="grid-phone-number"
            type="text"
            placeholder="Numéro de téléphone"
            v-model="phoneNumber"
            :class="{ 'border-ord-red focus:border-ord-red': phoneNumberIsNotValid }"
        />
        <div class="text-ord-red" v-show="phoneNumberIsNotValid">Le numéro de téléphone doit contenir 10 chiffres.</div>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 -mb-6 py-5">
      <div class="w-full min-w-56 md:w-1/2 px-3">
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
      <div class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
            id="grid-password-confirm"
            type="password"
            placeholder="Confirmation mot de passe"
            v-model="passwordConfirm"
            :class="{ 'border-ord-red focus:border-ord-red': passwordConfirmIsNotValid }"
        />
        <div class="text-ord-red" v-show="passwordConfirmIsNotValid">Le mot de passe de confirmation ne correspond pas au mot de passe.</div>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 -mb-6 py-5">
      <div class="w-full min-w-40 md:w-1/4 px-3">
        <input
            class="border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
            id="grid-street-number"
            type="text"
            placeholder="N° rue"
            v-model="streetNumber"
            :class="{ 'border-ord-red focus:border-ord-red': streetNumberIsNotValid }"
        />
        <div class="text-ord-red" v-show="streetNumberIsNotValid">Le numéro de rue n'est pas valide.</div>
      </div>
      <div class="w-full min-w-40 md:w-1/4 px-3">
        <input
            class="border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
            id="grid-street-name"
            type="text"
            placeholder="Nom de rue"
            v-model="streetName"
            :class="{ 'border-ord-red focus:border-ord-red': streetNameIsNotValid }"
        />
        <div class="text-ord-red" v-show="streetNameIsNotValid">Le nom de rue n'est pas valide.</div>
      </div>
      <div class="w-full min-w-40 md:w-1/4 px-3">
        <input
            class="border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
            id="grid-postal-code"
            type="text"
            placeholder="Code postal"
            v-model="postalCode"
            :class="{ 'border-ord-red focus:border-ord-red': postalCodeIsNotValid }"
        />
        <div class="text-ord-red" v-show="postalCodeIsNotValid">Le code postal doit contenir 5 chiffres.</div>
      </div>
      <div class="w-full min-w-40 md:w-1/4 px-3">
        <input
            class="border-b-2 border-gray-400 w-full focus:outline-none focus:border-ord-green-100"
            id="grid-city"
            type="text"
            placeholder="Commune"
            v-model="city"
            :class="{ 'border-ord-red focus:border-ord-red': cityIsNotValid }"
        />
        <div class="text-ord-red" v-show="cityIsNotValid">Le nom de la commune n'est pas valide.</div>
      </div>
    </div>
    <div class="flex flex-row mt-12 flex-wrap justify-center gap-x-7 gap-y-2">
      <button
          class="bg-ord-green-100 hover:bg-ord-green-200 text-white px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
      >
        Confirmer
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      lastName: "",
      firstName: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
      streetNumber: "",
      streetName: "",
      postalCode: "",
      city: "",
      lastNameIsNotValid: false,
      firstNameIsNotValid: false,
      emailIsNotValid: false,
      phoneNumberIsNotValid: false,
      passwordIsNotValid: false,
      passwordConfirmIsNotValid: false,
      streetNumberIsNotValid: false,
      streetNameIsNotValid: false,
      postalCodeIsNotValid: false,
      cityIsNotValid: false,
    }
  },
  methods: {
    register() {
      this.$router.push("/");
    }
  },
  watch: {
    lastName: function() {
      this.lastNameIsNotValid = !/^[A-Z][-a-zA-Z\u00E0-\u00FC]+$/.test(this.lastName);
    },

    firstName: function() {
      this.firstNameIsNotValid = !/^[A-Z][-a-zA-Z\u00E0-\u00FC]+$/.test(this.firstName);
    },

    email: function() {
      this.emailIsNotValid = !/^[a-zA-Z\u00E0-\u00FC\d_.+-]+@[a-zA-Z\u00E0-\u00FC\d-]+\.[a-zA-Z\u00E0-\u00FC\d-.]+$/.test(this.email);
    },

    phoneNumber: function() {
      this.phoneNumberIsNotValid = !/^0[67]\d{8}$/.test(this.phoneNumber);
    },

    password: function() {
      this.passwordIsNotValid = !/^(?=.*[A-Za-z\u00E0-\u00FC])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\u00E0-\u00FC\d@$!%*#?&]{8,}$/.test(this.password);
    },

    passwordConfirm: function() {
      this.passwordConfirmIsNotValid = this.password !== this.passwordConfirm;
    },

    streetNumber: function() {
      this.streetNumberIsNotValid = !/^\d+$/.test(this.streetNumber);
    },

    streetName: function() {
      this.streetNameIsNotValid = !/^[-a-zA-Z\u00E0-\u00FC ]+$/.test(this.streetName);
    },

    postalCode: function() {
      this.postalCodeIsNotValid = !/^\d{5}$/.test(this.postalCode);
    },

    city: function() {
      this.cityIsNotValid = !/^[a-zA-Z\u00E0-\u00FC]+(?:[\s-][a-zA-Z\u00E0-\u00FC]+)*$/.test(this.city);
    },
  },
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