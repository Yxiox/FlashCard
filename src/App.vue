<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header>
    <div class="home">
      <RouterLink to="/">Home</RouterLink>
    </div>

    <!-- Hamburger button -->
    <button class="hamburger" @click="toggleMenu">
      ☰
    </button>

    <!-- Slide menu -->
<nav :class="{ open: isMenuOpen }">
  <!-- Close button -->
  <button class="close-btn" @click="toggleMenu">✕</button>

  <RouterLink to="/tuberculose" @click="toggleMenu">Tuberculose</RouterLink>
  <RouterLink to="/malaria" @click="toggleMenu">Malária</RouterLink>
  <RouterLink to="/HIV" @click="toggleMenu">HIV</RouterLink>
  <RouterLink to="/diabetes" @click="toggleMenu">Diabetes</RouterLink>
  <RouterLink to="/hipertensao" @click="toggleMenu">Hipertensão</RouterLink>
  <RouterLink to="/cancer" @click="toggleMenu">Câncer</RouterLink>
  <RouterLink to="/alzheimer" @click="toggleMenu">Alzheimer</RouterLink>
  <RouterLink to="/parkinson" @click="toggleMenu">Parkinson</RouterLink>
  <RouterLink to="/epilepsia" @click="toggleMenu">Epilepsia</RouterLink>
  <RouterLink to="/asma" @click="toggleMenu">Asma</RouterLink>
  <RouterLink to="/pneumonia" @click="toggleMenu">Pneumonia</RouterLink>
  <RouterLink to="/anemia" @click="toggleMenu">Anemia</RouterLink>
  <RouterLink to="/leucemia" @click="toggleMenu">Leucemia</RouterLink>
  <RouterLink to="/endocrinas" @click="toggleMenu">Endócrinas</RouterLink>
  <RouterLink to="/esquizofrenia" @click="toggleMenu">Esquizofrenia</RouterLink>
</nav>
  </header>

  <RouterView :key="$route.fullPath" />
</template>


<style scoped>
header {
  width: 100vw;
  padding: 5px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home a {
  font-weight: bold;
}

/* Hamburger button */
.hamburger {
  display: block;
  font-size: 28px;
  color: rgb(147, 255, 192);
  background: none;
  border: none;
  cursor: pointer;
}

/* Desktop nav */
nav {
  display: flex;
  gap: 5px;
  font-weight: bold;
  font-size: 18px;
}

  .hamburger {
    display: block;
  }

  nav {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 260px;
    background: rgb(80, 80, 80);
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.15);

    flex-direction: column;
    padding: 80px 20px;
    gap: 16px;

    overflow-y: auto;

    transform: translateX(100%);
    transition: transform 0.25s ease-out;
  }

  nav.open {
    transform: translateX(0);
  }

  .close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 26px;
  color: rgb(147, 255, 192);
  background: transparent;
  border: none;
  cursor: pointer;
  display: block;
}



</style>
