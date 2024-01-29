<template>
  <div>
    <div class="wrapper">
      <nav>
        <img class="logo" src="./assets/logo.svg" alt="Logo" />
        <!-- <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/product">Produit</RouterLink> -->
      </nav>
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';

</script>

<style>
#app {
  background-color: rgb(34, 34, 34);
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-color: #f5f5f5;
  width: 100%;
  height: 100vh;
}

.logo {
  width: 50px;
  height: 50px;
}

nav {
  background-color: transparent;
  padding: 1rem 3rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 700;
}
</style>
