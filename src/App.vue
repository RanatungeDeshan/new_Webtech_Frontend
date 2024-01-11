<template>
  <div class="app">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/patient_logo.jpg" />

      <div class="wrapper">
        <HelloWorld msg="Hello World!.." />

        <nav v-if="$route.path !== '/'">
          <RouterLink to="/">Login</RouterLink>
          <RouterLink to="/home">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/patients">Patients</RouterLink>
        </nav>
      </div>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f0f0f0;
}

.logo {
  width: 250px;
  height: 250px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav a {
  padding: 0 1rem;
  text-decoration: none;
  color: #333; /* Farbe der Links */
  font-size: 20px; /* Größe der Links */
  background-color: #f0f0f0; /* Hintergrundfarbe der Links */
  border-radius: 5px; /* Runde Ecken für die Links */
  margin: 0 10px; /* Abstand zwischen den Links */
}

nav a.router-link-exact-active {
  color: #0099ff; /* Farbe des aktiven Links */
  background-color: #ddd; /* Hintergrundfarbe des aktiven Links */
}


nav a.router-link-exact-active {
  color: #0099ff;
}

main {
  flex-grow: 1;
  padding: 1rem;
}
</style>
