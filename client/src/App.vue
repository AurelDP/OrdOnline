<template>
  <router-view class="font-sans text-ord-dark-blue"/>
</template>

<script>
window.onload = () => {
  console.log("App.vue loaded");
  if (localStorage.getItem('WebToken') !== null) {
    localStorage.removeItem('WebToken');
    console.log("WebToken removed");
  }
};
</script>