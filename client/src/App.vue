<template>
  <div>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">
          <img class="logo" src="./assets/logo_scanfinity_white.svg" alt="Logo" />
        </RouterLink>
        <!-- <h2 class="color-brand-texte">Scan Infinity</h2> -->
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
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  width: 100%;
  height: 100vh;
  color: #F8F8F8;
  font-family: 'Futura Hv BT';
}

#app {
  background-color: #121212;
  min-height: 100%;
}

.logo {
  width: 70px;
  height: 70px;
}

nav {
  background-color: transparent;
  padding: 1rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #F8F8F8;
}

nav a {
  color: #F8F8F8;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 700;
}

a {
  text-decoration: none;
}

.color-brand-texte {
  color: #F8F8F8;
  font-size: 1rem;
  margin-left: 0.8rem;
}
</style>
