<template>
  <footer class="bg-ord-dark-blue shadow ord-px-adapt ord-py-adapt text-light-gray mt-auto">
    <div class="flex items-center justify-between flex-col sm:flex-row">
      <router-link to="/" class="flex items-center hover:text-ord-green-600">
        <img src="../../assets/logo.svg" class="mr-3 h-8" alt="OrdOnline Logo"/>
        <p class="text-2xl font-semibold whitespace-nowrap">OrdOnline</p>
      </router-link>
      <ul class="flex flex-wrap items-center">
        <li>
          <router-link to="/about" class="mr-4 hover:text-ord-green-600 md:mr-6">About</router-link>
        </li>
        <li>
          <router-link to="" class="mr-4 hover:text-ord-green-600 md:mr-6">Privacy Policy</router-link>
        </li>
        <li>
          <router-link to="" class="mr-4 hover:text-ord-green-600 md:mr-6">Licensing</router-link>
        </li>
        <li>
          <router-link to="" class="hover:text-ord-green-600">Contact</router-link>
        </li>
      </ul>
    </div>
    <hr class="my-6"/>
    <p class="text-center">© 2022 OrdOnline. Tous droits réservés.</p>
  </footer>
</template>

<script>
export default {
  name: "Footer.vue"
}
</script>

<style scoped>

</style>