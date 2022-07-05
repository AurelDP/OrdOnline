<template>
  <WhiteBoard
      :title="title"
  >

    <form class="m-5" @submit="saveData">
      <div class="flex flex-wrap -mx-3 -mb-6 py-5">
        <div class="w-full min-w-56 md:w-1/2 px-3">
          <label for="grid-password" class="text-italic font-semibold">Nouveau mot de passe</label>
          <input
              class="ord-input"
              id="grid-password"
              type="password"
              placeholder="Nouveau mot de passe"
              v-model="password"
              :class="{ 'border-ord-red focus:border-ord-red': passwordIsNotValid }"
          />
          <div class="text-ord-red" v-show="passwordIsNotValid">Le mot de passe doit contenir au moins 8 caractères, une
            majuscule, une minuscule, un chiffre et un caractère spécial.
          </div>
        </div>
        <div class="w-full min-w-56 md:w-1/2 px-3">
          <label for="grid-password-confirm" class="text-italic font-semibold">Confirmation du mot de passe</label>
          <input
              class="ord-input"
              id="grid-password-confirm"
              type="password"
              placeholder="Confirmation mot de passe"
              v-model="passwordConfirm"
              :class="{ 'border-ord-red focus:border-ord-red': passwordConfirmIsNotValid }"
          />
          <div class="text-ord-red" v-show="passwordConfirmIsNotValid">Le mot de passe de confirmation ne correspond pas
            au mot de passe.
          </div>
        </div>
      </div>

      <div v-if="this.role !== 'healthService'" class="flex flex-wrap -mx-3 -mb-6 py-5">
        <div class="w-full min-w-40 md:w-1/4 px-3">
          <label for="grid-street-number" class="text-italic font-semibold">Numéro de rue</label>
          <input
              class="ord-input"
              id="grid-street-number"
              type="text"
              placeholder="N° rue"
              v-model="streetNumber"
              :class="{ 'border-ord-red focus:border-ord-red': streetNumberIsNotValid }"
              required
          />
          <div class="text-ord-red" v-show="streetNumberIsNotValid">Le numéro de rue n'est pas valide.</div>
        </div>
        <div class="w-full min-w-40 md:w-1/4 px-3">
          <label for="grid-street-name" class="text-italic font-semibold">Nom de rue</label>
          <input
              class="ord-input"
              id="grid-street-name"
              type="text"
              placeholder="Nom de rue"
              v-model="streetName"
              :class="{ 'border-ord-red focus:border-ord-red': streetNameIsNotValid }"
              required
          />
          <div class="text-ord-red" v-show="streetNameIsNotValid">Le nom de rue n'est pas valide.</div>
        </div>
        <div class="w-full min-w-40 md:w-1/4 px-3">
          <label for="grid-postal-code" class="text-italic font-semibold">Code postal</label>
          <input
              class="ord-input"
              id="grid-postal-code"
              type="text"
              placeholder="Code postal"
              v-model="postalCode"
              :class="{ 'border-ord-red focus:border-ord-red': postalCodeIsNotValid }"
              required
          />
          <div class="text-ord-red" v-show="postalCodeIsNotValid">Le code postal doit contenir 5 chiffres.</div>
        </div>
        <div class="w-full min-w-40 md:w-1/4 px-3">
          <label for="grid-city" class="text-italic font-semibold">Commune</label>
          <input
              class="ord-input"
              id="grid-city"
              type="text"
              placeholder="Commune"
              v-model="city"
              :class="{ 'border-ord-red focus:border-ord-red': cityIsNotValid }"
              required
          />
          <div class="text-ord-red" v-show="cityIsNotValid">Le nom de la commune n'est pas valide.</div>
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 -mb-6 py-5">
        <div class="w-full min-w-56 md:w-1/2 px-3">
          <label for="grid-phone-number" class="text-italic font-semibold">Numéro de téléphone</label>
          <input
              class="ord-input"
              id="grid-phone-number"
              type="text"
              placeholder="Numéro de téléphone"
              v-model="phoneNumber"
              :class="{ 'border-ord-red focus:border-ord-red': phoneNumberIsNotValid }"
              required
          />
          <div class="text-ord-red" v-show="phoneNumberIsNotValid">Le numéro de téléphone doit contenir 10 chiffres.
          </div>
        </div>
        <div v-if="this.role !== 'patient'"
             class="w-full min-w-56 md:w-1/2 px-3">
          <label for="grid-rpps" class="text-italic font-semibold">Numéro RPPS</label>
          <input
              class="ord-input"
              id="grid-rpps"
              type="text"
              placeholder="Numéro RPPS"
              v-model="rppsNumber"
              :class="{ 'border-ord-red focus:border-ord-red': rppsNumberIsNotValid }"
              required
          />
          <div class="text-ord-red" v-show="rppsNumberIsNotValid">Le numéro RPPS doit contenir exactement 11
            chiffres.
          </div>
        </div>
        <div v-else class="w-full min-w-56 md:w-1/2 px-3">
          <label for="grid-securityNumber" class="text-italic font-semibold">Numéro de Sécurité Sociale</label>
          <input
              class="ord-input"
              id="grid-securityNumber"
              type="text"
              placeholder="Numéro de Sécurité Sociale"
              v-model="securityNumber"
              :class="{ 'border-ord-red focus:border-ord-red': securityNumberIsNotValid }"
          />
          <div class="text-ord-red" v-show="securityNumberIsNotValid">Le numéro de Sécurité Sociale doit contenir
            exactement 15 chiffres.
          </div>
        </div>
      </div>

      <div v-if="this.role === 'doctor'" class="flex flex-wrap -mx-3 -mb-6 py-5">
        <div class="w-full min-w-56 px-3">
          <label for="grid-domain" class="text-italic font-semibold">Domaine</label>
          <input
              class="ord-input"
              id="grid-domain"
              type="text"
              placeholder="Domaine"
              v-model="domain"
              :class="{ 'border-ord-red focus:border-ord-red': domainIsNotValid }"
              required
          />
          <div class="text-ord-red" v-show="domainIsNotValid">Le domaine n'est pas valide.
          </div>
        </div>
      </div>

      <div v-if="this.role === 'patient'" class="flex flex-wrap -mx-3 -mb-6 py-5">
        <div class="w-full min-w-56 md:w-1/2 px-3">
          <label for="grid-birth-date" class="text-italic font-semibold">Date de naissance</label>
          <input
              class="ord-input"
              id="grid-birth-date"
              type="text"
              placeholder="Date de naissance (JJ/MM/AAAA)"
              v-model="birthDate"
              :class="{ 'border-ord-red focus:border-ord-red': birthDateIsNotValid }"
          />
          <div class="text-ord-red" v-show="birthDateIsNotValid">La date de naissance doit être au format JJ/MM/AAAA.
          </div>
        </div>
        <div class="w-full min-w-56 md:w-1/2 px-3">
          <label for="grid-weight" class="text-italic font-semibold">Poids (kg)</label>
          <input
              class="ord-input"
              id="grid-weight"
              type="text"
              placeholder="Poids (kg)"
              v-model="weight"
              :class="{ 'border-ord-red focus:border-ord-red': weightIsNotValid }"
          />
          <div class="text-ord-red" v-show="weightIsNotValid">Le poids n'est pas valide.
          </div>
        </div>
      </div>

      <div class="ord-whiteboard-buttons">
        <button class="ord-button ord-button-green hover:ord-button-green-hover transition" type="submit">
          Sauvegarder
        </button>
      </div>
    </form>

    <Modal
        v-show="showModalError"
        @button1Click="closeModalError"
        :icon="'fa-warning'"
        :iconClass="'text-ord-red'"
        :textModal="modalErrorText"
        :text1="'Ok'"
        :class1="'ord-button-red hover:ord-button-red-hover'"
    />
    <Modal
        v-show="showModalSuccess"
        @button1Click="closeModalSuccess"
        :icon="'fa-check'"
        :iconClass="'text-ord-green-100'"
        :textModal="'Informations correctement sauvegardées'"
        :text1="'Continuer'"
        :class1="'ord-button-green hover:ord-button-green-hover'"
    />

  </WhiteBoard>
</template>

<script>
import WhiteBoard from '../../components/globalComponents/WhiteBoard.vue'
import Modal from '../../components/globalComponents/Modal.vue'

const BASE_URL = 'http://localhost:8081/'

export default {
  name: "InfoUser",
  components: {
    WhiteBoard,
    Modal
  },
  data() {
    return {
      title: "",
      role: localStorage.getItem("Role"),
      password: "",
      passwordConfirm: "",
      streetNumber: "",
      streetName: "",
      postalCode: "",
      city: "",
      phoneNumber: "",
      rppsNumber: "",
      securityNumber: "",
      domain: "",
      birthDate: "",
      weight: "",
      passwordIsNotValid: false,
      passwordConfirmIsNotValid: false,
      streetNumberIsNotValid: false,
      streetNameIsNotValid: false,
      postalCodeIsNotValid: false,
      cityIsNotValid: false,
      phoneNumberIsNotValid: false,
      rppsNumberIsNotValid: false,
      securityNumberIsNotValid: false,
      domainIsNotValid: false,
      birthDateIsNotValid: false,
      weightIsNotValid: false,
      showModalError: false,
      showModalSuccess: false,
      modalErrorText: "",
    }
  },
  methods: {
    saveData(e) {
      fetch(BASE_URL + "users/saveInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
          "Authorization": localStorage.getItem("WebToken")
        },
        body: JSON.stringify({
          password: this.password,
          streetNumber: this.streetNumber,
          streetName: this.streetName,
          postalCode: this.postalCode,
          city: this.city,
          phoneNumber: this.phoneNumber,
          rppsNumber: this.rppsNumber,
          securityNumber: this.securityNumber,
          domain: this.domain,
          birthDate: this.birthDate,
          weight: this.weight
        })
      })
          .then(res => res.json())
          .then(res => {
            if (res.result === "success") {
              this.showModalSuccess = true;
            } else if (res.result === "phoneNumberAlreadyExists") {
              this.modalErrorText = "Numéro de téléphone déjà utilisé";
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
    closeModalSuccess() {
      this.showModalSuccess = false;
    }
  },
  created() {
    fetch(BASE_URL + "users/getInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
        "Authorization": localStorage.getItem("WebToken")
      }
    })
        .then(res => res.json())
        .then(res => {
          if (res.result !== "error") {
            this.title = res.result.name;
            this.streetNumber = res.result.streetNumber;
            this.streetName = res.result.streetName;
            this.postalCode = res.result.postalCode;
            this.city = res.result.city;
            this.phoneNumber = res.result.phoneNumber;
            if (res.result.rppsNumber !== null)
              this.rppsNumber = res.result.rppsNumber;
            if (res.result.securityNumber !== null)
              this.securityNumber = res.result.securityNumber;
            this.domain = res.result.domain;
            if (res.result.birthDate !== null)
              this.birthDate = res.result.birthDate;
            if (res.result.weight !== null)
              this.weight = res.result.weight;
          } else {
            console.log(res.result);
          }
        });
  },
  watch: {
    password: function () {
      this.passwordIsNotValid = !/^(?=.*[A-Za-z\u00E0-\u00FC])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\u00E0-\u00FC\d@$!%*#?&]{8,}$/.test(this.password);
      if (this.password === "")
        this.passwordIsNotValid = false;
    },

    passwordConfirm: function () {
      this.passwordConfirmIsNotValid = this.password !== this.passwordConfirm;
    },

    streetNumber: function () {
      this.streetNumberIsNotValid = !/^\d+$/.test(this.streetNumber);
    },

    streetName: function () {
      this.streetNameIsNotValid = !/^[A-Z][a-zA-Z'\u00E0-\u00FC]+(?:[\s-][a-zA-Z'\u00E0-\u00FC]+)*$/.test(this.streetName);
    },

    postalCode: function () {
      this.postalCodeIsNotValid = !/^\d{5}$/.test(this.postalCode);
    },

    city: function () {
      this.cityIsNotValid = !/^[A-Z][a-zA-Z\u00E0-\u00FC]+(?:[\s-][a-zA-Z\u00E0-\u00FC]+)*$/.test(this.city);
    },

    phoneNumber: function () {
      this.phoneNumberIsNotValid = !/^0[67]\d{8}$/.test(this.phoneNumber);
    },

    rppsNumber: function () {
      this.rppsNumberIsNotValid = !/^\d{11}$/.test(this.rppsNumber);
    },

    securityNumber: function () {
      this.securityNumberIsNotValid = !/^\d{15}$/.test(this.securityNumber);
      if (this.securityNumber === "")
        this.securityNumberIsNotValid = false;
    },

    domain: function () {
      this.domainIsNotValid = !/^[A-Z][a-zA-Z'\u00E0-\u00FC]+(?:[\s-][a-zA-Z'\u00E0-\u00FC]+)*$/.test(this.domain);
    },

    birthDate: function () {
      this.birthDateIsNotValid = !/^\d{2}['/']\d{2}['/']\d{4}$/.test(this.birthDate);
      if (this.birthDate === "")
        this.birthDateIsNotValid = false;
    },

    weight: function () {
      this.weightIsNotValid = !/^\d{1,3}$/.test(this.weight);
      if (this.weight === "")
        this.weightIsNotValid = false;
    }
  }
}
</script>

<style scoped>

</style>