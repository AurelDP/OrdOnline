<template>
  <div class="flex md:flex-row flex-col h-126 bg-ord-green-600 ord-px-body-adapt">
    <div class="flex flex-col pt-12 md:pt-0 self-center text-left md:mr-20">
      <h1 class="ord-text-title">
        Votre nouveau système <br/>
        d'ordonnances <span class="text-ord-green-200">dématérialisées</span>
      </h1>
      <p class="ord-text-subtitle mt-6">Professionnels et particuliers</p>
    </div>
    <img class="md:h-full h-96 mx-auto md:mx-0 md:ml-auto relative top-10 md:top-20" src="../../assets/Accueil/HeaderImage.svg" alt="Header image">
  </div>
  <div class="w-screen h-8 mb-20 sm:mb-24 md:mb-12 bg-gradient-to-b from-ord-green-600"/>

  <h1 class="flex mt-11 ord-px-body-adapt ord-text-title">Ord'Online c'est quoi ?</h1>

  <div class="flex flex-wrap ord-px-body-adapt md:gap-36 sm:gap-20 gap-10 my-20 place-content-center">
    <InfoBubble class="transition hover:scale-110" blackWord="Application" greenWord="sécurisée" :path="require('../../assets/Accueil/infoSecure.svg')"/>
    <InfoBubble class="transition hover:scale-110" blackWord="Communication" greenWord="fluide" :path="require('../../assets/Accueil/infoCommunication.svg')"/>
    <InfoBubble class="transition hover:scale-110" blackWord="Utilisation" greenWord="simple" :path="require('../../assets/Accueil/infoSimple.svg')"/>
  </div>

  <div v-if="isConnected === false" class="flex flex-wrap bg-ord-green-600 ord-px-body-adapt py-10">
    <p class="ord-text-title mr-16">Pas encore de compte ?</p>
    <p class="ord-text-subtitle mt-1 align-middle">Inscrivez-vous <router-link to="/signUp" class="text-ord-green-200 hover:text-ord-green-400">dès maintenant !</router-link></p>
  </div>

</template>

<script>
import InfoBubble from '@/components/homePage/InfoBubble.vue'

export default {
  name: 'HomeBody',
  components: {
    InfoBubble
  },
  props: {
    isConnected: Boolean
  }
}
</script>

<style scoped>
.h-126 {
  height: 31rem;
}
</style>