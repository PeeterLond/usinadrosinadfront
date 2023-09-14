<template>
  <div class="flex-master">
    <header>
      <div class="header-item company-logo">
        <img src="../src/assets/logo.png" alt="ettevõtte logo" id="company-logo">
      </div>
      <div class="header-item company-name">
        <h1>Usinad Rosinad</h1>
      </div>
      <div class="header-item">
        <router-link v-if="!loggedIn" to="/login"><button type="button" class="btn btn-dark m-3" >Logi sisse</button></router-link>
        <router-link v-else @click="handleLogOut" to="/"><button type="button" class="btn btn-danger m-3" >Logi välja</button></router-link>
      </div>
    </header>
    <nav v-if="loggedIn">
      <div class="nav-item">
        <router-link to="/">Kodu</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/advertisements">Kuulutused</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/dashboard">Minu töölaud</router-link>
      </div>
      <div class="nav-item nav-item1">
        <router-link to="/">Minu sõnumid</router-link>
      </div>
    </nav>
    <main>
      <div class="main-item">
        <router-view :key="$route.fullPath" @event-update-nav-menu="updateNavMenu"></router-view>
      </div>
    </main>
    <footer>
      <div class="footer-item social-media-icons">FB, Insta ja meili logo</div>
      <div class="footer-item">
        <p> Usinad Rosinad OÜ <br>
          Reg.nr 314159265 <br>
          AA: EE3141592658979323 <br>
          Usina tn 1, Rosina maakond </p>
      </div>
    </footer>
  </div>
</template>

<script>


import router from "@/router";
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      loggedIn: false
    }
  },
  methods: {
    updateNavMenu() {
      this.loggedIn = sessionStorage.getItem('userId') !== null
    },
    handleLogOut() {
      sessionStorage.clear()
      this.updateNavMenu()
    }
  },
  beforeMount() {
    this.updateNavMenu()
  }
})

</script>