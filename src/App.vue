<template>
  <div class="flex-master">
    <header>
      <div class="header-item">
        <div class="company-logo">

          <img @click="goHome" src="@/assets/image/pic.jpg" alt="ettevõtte logo" id="company-logo">
        </div>
      </div>
      <div class="header-item">
        <router-link v-if="!loggedIn" to="/login">
          <button type="button" class="btn btn-dark">Logi sisse</button>
        </router-link>
        <router-link v-else @click="handleLogOut" to="/">
          <button type="button" class="btn btn-dark">Logi välja</button>
        </router-link>
      </div>
    </header>
    <nav v-if="loggedIn">
      <div class="nav-item">
        <router-link to="/" class="naw-text">Kodu</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/advertisements" class="naw-text">Kuulutused</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/dashboard" class="naw-text">Minu töölaud</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/mailbox" class="naw-text">Minu sõnumid</router-link>
      </div>
    </nav>
    <main>
      <div class="main-item">
        <router-view :key="$route.fullPath" @event-update-nav-menu="updateNavMenu"></router-view>
      </div>
    </main>
    <footer>
      <div class="footer-item social-media-icons">
        <a href="https://www.facebook.com" class="icon">
          <font-awesome-icon :icon="['fab', 'facebook']" size="2xl"/>
        </a>
        <a href="https://www.instagram.com" class="icon">
          <font-awesome-icon :icon="['fab', 'instagram']" size="2xl"/>
        </a>
        <a href="mailto:usin@rosin.ee" class="icon">
          <font-awesome-icon :icon="['far', 'envelope']" size="2xl"/>
        </a>
      </div>
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
    goHome() {
      router.push({name: 'homeRoute'})
    },
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