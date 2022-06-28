<template>
  <div class="flex md:flex-row flex-col h-80 bg-ord-green-600 px-14">
    <div class="flex flex-col pt-12 md:pt-0 self-center text-left mr-5">
      <h1 class="text-2xl font-extrabold">
        Votre nouveau système <br/>
        d'ordonnances <span class="text-ord-green-200">dématérialisées</span>
      </h1>
      <p class="mt-6">Professionnels et particuliers</p>
    </div>
    <img class="md:h-96 h-64 sm:h-72 mx-8 mx-auto md:ml-auto relative top-10 md:top-20" src="../../assets/Accueil/HeaderImage.svg" alt="Header image">
  </div>
  <div class="w-screen h-8 mb-24 bg-gradient-to-b from-ord-green-600"/>

  <h1 class="flex mt-48 md:mt-10 m-14 text-2xl font-extrabold">Ord'Online c'est quoi ?</h1>

  <div class="flex flex-wrap md:gap-28 sm:gap-8 gap-5 place-content-center mb-10">
    <bulle blackWord="Application" greenWord="sécurisée" :path="require('../../assets/Accueil/infoSecure.svg')"/>
    <bulle blackWord="Communication" greenWord="fluide" :path="require('../../assets/Accueil/infoCommunication.svg')"/>
    <bulle blackWord="Utilisation" greenWord="simple" :path="require('../../assets/Accueil/infoSimple.svg')"/>
  </div>

  <div class="flex bg-ord-green-600 p-14 text-2xl font-extrabold">
    <p>Pas encore de compte ?<span class="ml-10 text-ord-green-200 text-sm">Inscrivez-vous</span> <span class="text-sm"> dès maintenant !</span></p>
  </div>

</template>

<script>
import Bulle from '@/components/Accueil/bulle.vue'

export default {
  name: 'Body',
  components: {
    Bulle
  }
}
</script>

<style scoped>

</style>