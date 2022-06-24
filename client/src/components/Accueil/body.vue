<template>
  <div class="flex flex-row flex-wrap h-80 bg-ord-green-600 px-14">
    <div class="self-center text-left">
      <h1 class="text-2xl font-extrabold">
        Votre nouveau système <br/>
        d'ordonnances <span class="text-ord-green-200">dématérialisées</span>
      </h1>
      <p class="mt-6">Professionnels et particuliers</p>
    </div>
    <img class="h-96 ml-auto relative top-20" src="../../assets/Accueil/HeaderImage.svg" alt="Header image">
  </div>
  <div class="w-screen h-8 mb-24 bg-gradient-to-b from-ord-green-600"/>

  <h1 class="flex m-14 text-2xl font-extrabold">Ord'Online c'est quoi ?</h1>

  <div class="grid grid-cols-3">
    <div class="justify-self-end	self-center">
      <img class="bg-ord-green-600 rounded" src="../../assets/Accueil/infoSecure.svg" alt="Secure image">
      <h1 class="text-2xl font-extrabold">Application<br><span class="text-ord-green-200">sécurisée</span></h1>
    </div>
    <div class="justify-self-center self-center">
      <img src="../../assets/Accueil/infoCommunication.svg" alt="Communication image">
      <h1 class="text-2xl font-extrabold">Communication<br><span class="text-ord-green-200">fluide</span></h1>
    </div>
    <div class="justify-self-start	 self-center">
      <img src="../../assets/Accueil/infoSimple.svg" alt="Simple image">
      <h1 class="text-2xl font-extrabold">Utilisation<br><span class="text-ord-green-200">simple</span></h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Body'
}

</script>

<style scoped>

</style>