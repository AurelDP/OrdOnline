<template>
  <form class="m-5" @submit="register">

    <div v-if="type === 'doctor' || type === 'patient'"
         class="flex flex-wrap -mx-3 -mb-6 py-5">
      <div class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="ord-input"
            id="grid-last-name"
            type="text"
            placeholder="Nom"
            v-model="lastName"
            :class="{ 'border-ord-red focus:border-ord-red': lastNameIsNotValid }"
            requiredd
        />
        <div class="text-ord-red" v-show="lastNameIsNotValid">Le nom doit doit contenir uniquement des lettres et
          commencer par une majuscule.
        </div>
      </div>
      <div class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="ord-input"
            id="grid-first-name"
            type="text"
            placeholder="Prénom"
            v-model="firstName"
            :class="{ 'border-ord-red focus:border-ord-red': firstNameIsNotValid }"
            requiredd
        />
        <div class="text-ord-red" v-show="firstNameIsNotValid">Le prénom doit contenir uniquement des lettres et
          commencer par une majuscule.
        </div>
      </div>
    </div>

    <div v-if="type === 'healthService'"
         class="flex flex-wrap -mx-3 -mb-6 py-5">
      <div class="w-full min-w-56 md:w-1/3 px-3">
        <input
            class="ord-input"
            id="grid-last-name"
            type="text"
            placeholder="Nom"
            v-model="lastName"
            :class="{ 'border-ord-red focus:border-ord-red': lastNameIsNotValid }"
            requiredd
        />
        <div class="text-ord-red" v-show="lastNameIsNotValid">Le nom doit doit contenir uniquement des lettres et
          commencer par une majuscule.
        </div>
      </div>
      <div class="w-full min-w-56 md:w-1/3 px-3">
        <input
            class="ord-input"
            id="grid-first-name"
            type="text"
            placeholder="Prénom"
            v-model="firstName"
            :class="{ 'border-ord-red focus:border-ord-red': firstNameIsNotValid }"
            requiredd
        />
        <div class="text-ord-red" v-show="firstNameIsNotValid">Le prénom doit contenir uniquement des lettres et
          commencer par une majuscule.
        </div>
      </div>
      <div class="w-full min-w-56 md:w-1/3 px-3">
        <input
            class="ord-input"
            id="grid-rpps"
            type="text"
            placeholder="Numéro RPPS"
            v-model="rppsNumber"
            :class="{ 'border-ord-red focus:border-ord-red': rppsNumberIsNotValid }"
            requiredd
        />
        <div class="text-ord-red" v-show="rppsNumberIsNotValid">Le numéro RPPS doit contenir exactement 11 chiffres.
        </div>
      </div>
    </div>

    <div v-if="type !== 'patient' && type !== 'healthService'" class="flex flex-wrap -mx-3 -mb-6 py-5">
      <div v-if="type === 'doctor' || type === 'pharma'"
           class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="ord-input"
            id="grid-rpps"
            type="text"
            placeholder="Numéro RPPS"
            v-model="rppsNumber"
            :class="{ 'border-ord-red focus:border-ord-red': rppsNumberIsNotValid }"
            requiredd
        />
        <div class="text-ord-red" v-show="rppsNumberIsNotValid">Le numéro RPPS doit contenir exactement 11 chiffres.
        </div>
      </div>
      <div v-if="type === 'doctor'" class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="ord-input"
            id="grid-domain"
            type="text"
            placeholder="Domaine"
            v-model="domain"
            :class="{ 'border-ord-red focus:border-ord-red': domainIsNotValid }"
            requiredd
        />
        <div class="text-ord-red" v-show="domainIsNotValid">Le domaine n'est pas valide.
        </div>
      </div>
      <div v-if="type === 'pharma'" class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="ord-input"
            id="grid-name-pharma"
            type="text"
            placeholder="Nom pharmacie"
            v-model="namePharma"
            :class="{ 'border-ord-red focus:border-ord-red': namePharmaIsNotValid }"
            requiredd
        />
        <div class="text-ord-red" v-show="namePharmaIsNotValid">Le nom de la pharmacie n'est pas valide.
        </div>
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 -mb-6 py-5">
      <div class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="ord-input"
            id="grid-mail"
            type="email"
            placeholder="Adresse email"
            v-model="email"
            :class="{ 'border-ord-red focus:border-ord-red': emailIsNotValid }"
            requiredd
        />
        <div class="text-ord-red" v-show="emailIsNotValid">L'adresse email n'est pas valide.</div>
      </div>
      <div class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="ord-input"
            id="grid-phone-number"
            type="text"
            placeholder="Numéro de téléphone"
            v-model="phoneNumber"
            :class="{ 'border-ord-red focus:border-ord-red': phoneNumberIsNotValid }"
            requiredd
        />
        <div class="text-ord-red" v-show="phoneNumberIsNotValid">Le numéro de téléphone doit contenir 10 chiffres.</div>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 -mb-6 py-5">
      <div class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="ord-input"
            id="grid-password"
            type="password"
            placeholder="Mot de passe"
            v-model="password"
            :class="{ 'border-ord-red focus:border-ord-red': passwordIsNotValid }"
            requiredd
        />
        <div class="text-ord-red" v-show="passwordIsNotValid">Le mot de passe doit contenir au moins 8 caractères, une
          majuscule, une minuscule, un chiffre et un caractère spécial.
        </div>
      </div>
      <div class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="ord-input"
            id="grid-password-confirm"
            type="password"
            placeholder="Confirmation mot de passe"
            v-model="passwordConfirm"
            :class="{ 'border-ord-red focus:border-ord-red': passwordConfirmIsNotValid }"
            requiredd
        />
        <div class="text-ord-red" v-show="passwordConfirmIsNotValid">Le mot de passe de confirmation ne correspond pas
          au mot de passe.
        </div>
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 -mb-6 py-5">
      <div class="w-full min-w-40 md:w-1/4 px-3">
        <input
            class="ord-input"
            id="grid-street-number"
            type="text"
            placeholder="N° rue"
            v-model="streetNumber"
            :class="{ 'border-ord-red focus:border-ord-red': streetNumberIsNotValid }"
            requiredd
        />
        <div class="text-ord-red" v-show="streetNumberIsNotValid">Le numéro de rue n'est pas valide.</div>
      </div>
      <div class="w-full min-w-40 md:w-1/4 px-3">
        <input
            class="ord-input"
            id="grid-street-name"
            type="text"
            placeholder="Nom de rue"
            v-model="streetName"
            :class="{ 'border-ord-red focus:border-ord-red': streetNameIsNotValid }"
            requiredd
        />
        <div class="text-ord-red" v-show="streetNameIsNotValid">Le nom de rue n'est pas valide.</div>
      </div>
      <div class="w-full min-w-40 md:w-1/4 px-3">
        <input
            class="ord-input"
            id="grid-postal-code"
            type="text"
            placeholder="Code postal"
            v-model="postalCode"
            :class="{ 'border-ord-red focus:border-ord-red': postalCodeIsNotValid }"
            requiredd
        />
        <div class="text-ord-red" v-show="postalCodeIsNotValid">Le code postal doit contenir 5 chiffres.</div>
      </div>
      <div class="w-full min-w-40 md:w-1/4 px-3">
        <input
            class="ord-input"
            id="grid-city"
            type="text"
            placeholder="Commune"
            v-model="city"
            :class="{ 'border-ord-red focus:border-ord-red': cityIsNotValid }"
            requiredd
        />
        <div class="text-ord-red" v-show="cityIsNotValid">Le nom de la commune n'est pas valide.</div>
      </div>
    </div>
    <div class="ord-whiteboard-buttons">
      <button class="ord-button transition ord-button-green hover:ord-button-green-hover" type="submit">
        Confirmer
      </button>
    </div>
  </form>
  <Modal
      v-show="showModalError"
      @closeModal="closeModalError"
      :icon="'fa-warning'"
      :iconClass="'text-ord-red'"
      :textModal="'Email or password is already used, please try again'"
      :text1="'Ok'"
      :nameEmit1="'closeModal'"
      :class1="'ord-button-red hover:ord-button-red-hover'"
  />
</template>

<script>
import Modal from '../globalComponents/Modal.vue'

const BASE_URL = "http://localhost:8081/";
export default {
  name: "RegisterForm",
  props: {
    type: String,
  },
  components: {
    Modal,
  },
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
      rppsNumber: "",
      domain: "",
      namePharma: "",
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
      rppsNumberIsNotValid: false,
      domainIsNotValid: false,
      namePharmaIsNotValid: false,
      showModalError: false,
    }
  },
  methods: {
    register(e) {
      fetch(BASE_URL + "users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          type: this.type,
          lastName: this.lastName,
          firstName: this.firstName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
          streetNumber: this.streetNumber,
          streetName: this.streetName,
          postalCode: this.postalCode,
          city: this.city,
          rppsNumber: this.rppsNumber,
          domain: this.domain,
          namePharma: this.namePharma,
        })
      })
          .then(res => res.json())
          .then(res => {
            if (res.result === "success") {
              this.$router.push("/signIn");
            } else if (res.result === "emailOrPhoneNumberAlreadyExists") {
              this.showModalError = true;
            } else {
              console.log(res.result);
            }
          });
      e.preventDefault();
    },
    closeModalError() {
      this.showModalError = false;
    },
  },
  watch: {
    lastName: function () {
      this.lastNameIsNotValid = !/^[A-Z][-a-zA-Z\u00E0-\u00FC]+$/.test(this.lastName);
    },

    firstName: function () {
      this.firstNameIsNotValid = !/^[A-Z][-a-zA-Z\u00E0-\u00FC]+$/.test(this.firstName);
    },

    email: function () {
      this.emailIsNotValid = !/^[a-zA-Z\u00E0-\u00FC\d_.+-]+@[a-zA-Z\u00E0-\u00FC\d-]+\.[a-zA-Z\u00E0-\u00FC\d-.]+$/.test(this.email);
    },

    phoneNumber: function () {
      this.phoneNumberIsNotValid = !/^0[67]\d{8}$/.test(this.phoneNumber);
    },

    password: function () {
      this.passwordIsNotValid = !/^(?=.*[A-Za-z\u00E0-\u00FC])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\u00E0-\u00FC\d@$!%*#?&]{8,}$/.test(this.password);
    },

    passwordConfirm: function () {
      this.passwordConfirmIsNotValid = this.password !== this.passwordConfirm;
    },

    streetNumber: function () {
      this.streetNumberIsNotValid = !/^\d+$/.test(this.streetNumber);
    },

    streetName: function () {
      this.streetNameIsNotValid = !/^[A-Z][a-zA-Z\u00E0-\u00FC]+(?:[\s-][a-zA-Z\u00E0-\u00FC]+)*$/.test(this.streetName);
    },

    postalCode: function () {
      this.postalCodeIsNotValid = !/^\d{5}$/.test(this.postalCode);
    },

    city: function () {
      this.cityIsNotValid = !/^[A-Z][a-zA-Z\u00E0-\u00FC]+(?:[\s-][a-zA-Z\u00E0-\u00FC]+)*$/.test(this.city);
    },

    rppsNumber: function () {
      this.rppsNumberIsNotValid = !/^\d{11}$/.test(this.rppsNumber);
    },

    domain: function () {
      this.domainIsNotValid = !/^[A-Z][a-zA-Z\u00E0-\u00FC]+(?:[\s-][a-zA-Z\u00E0-\u00FC]+)*$/.test(this.domain);
    },

    namePharma: function () {
      this.namePharmaIsNotValid = !/^[A-Z][a-zA-Z\u00E0-\u00FC]+(?:[\s-][a-zA-Z\u00E0-\u00FC]+)*$/.test(this.namePharma);
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