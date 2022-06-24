<template>
  <form class="m-5">
    <div class="flex flex-wrap -mx-3 -mb-6 py-5">
      <div class="w-full min-w-56 md:w-1/2 px-3">
        <input
          class="bg-white border-b-2 border-gray-400 w-full focus:outline-none focus:border-b-2 focus:border-ord-green-100"
          id="grid-last-name"
          type="text"
          placeholder="Nom"
        />
      </div>
      <div class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="bg-white border-b-2 border-gray-400 w-full focus:outline-none focus:border-b-2 focus:border-ord-green-100"
            id="grid-first-name"
            type="text"
            placeholder="Prénom"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 -mb-6 py-5">
      <div class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="bg-white border-b-2 border-gray-400 w-full focus:outline-none focus:border-b-2 focus:border-ord-green-100"
            id="grid-mail"
            type="email"
            placeholder="Adresse mail"
        />
      </div>
      <div class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="bg-white border-b-2 border-gray-400 w-full focus:outline-none focus:border-b-2 focus:border-ord-green-100"
            id="grid-phone-number"
            type="number"
            placeholder="Numéro de téléphone"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 -mb-6 py-5">
      <div class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="bg-white border-b-2 border-gray-400 w-full min-w-fit focus:outline-none focus:border-b-2 focus:border-ord-green-100"
            id="grid-password"
            type="password"
            placeholder="Mot de passe"
        />
      </div>
      <div class="w-full min-w-56 md:w-1/2 px-3">
        <input
            class="bg-white border-b-2 border-gray-400 w-full focus:outline-none focus:border-b-2 focus:border-ord-green-100"
            id="grid-password-confirm"
            type="password"
            placeholder="Confirmation mot de passe"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 -mb-6 py-5">
      <div class="w-full min-w-40 md:w-1/4 px-3">
        <input
            class="bg-white border-b-2 border-gray-400 w-full focus:outline-none focus:border-b-2 focus:border-ord-green-100"
            id="grid-street-number"
            type="number"
            placeholder="N° rue"
        />
      </div>
      <div class="w-full min-w-40 md:w-1/4 px-3">
        <input
            class="bg-white border-b-2 border-gray-400 w-full focus:outline-none focus:border-b-2 focus:border-ord-green-100"
            id="grid-street-name"
            type="text"
            placeholder="Nom de rue"
        />
      </div>
      <div class="w-full min-w-40 md:w-1/4 px-3">
        <input
            class="bg-white border-b-2 border-gray-400 w-full focus:outline-none focus:border-b-2 focus:border-ord-green-100"
            id="grid-postal-code"
            type="number"
            placeholder="Code postal"
        />
      </div>
      <div class="w-full min-w-40 md:w-1/4 px-3">
        <input
            class="bg-white border-b-2 border-gray-400 w-full focus:outline-none focus:border-b-2 focus:border-ord-green-100"
            id="grid-city"
            type="text"
            placeholder="Commune"
        />
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "RegisterForm",
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