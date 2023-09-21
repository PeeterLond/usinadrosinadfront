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
        <router-link v-if="showNrOfUnreadMessages" to="/mailbox" class="naw-text" ref="routerRef">Minu sõnumid <span style="color: red">{{nrOfUnreadMessages}}</span></router-link>
        <router-link v-else to="/mailbox" class="naw-text" ref="routerRef">Minu sõnumid</router-link>
      </div>
    </nav>
    <main>
      <div class="main-item">
        <router-view :key="$route.fullPath" @event-update-nav-menu="updateNavMenu" @update-nr-of-unread-messages="updateNrOfUnreadMessages"></router-view>
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
      <div class="footer-item" >
        <p>Usinad Rosinad OÜ</p>
        <p> Usina tn 1, Rosina maakond, Reg. nr 314159265</p>
        <p>Arveldusarve: EE3141592658979323</p>

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
      loggedIn: false,
      nrOfUnreadMessages: 0,
      showNrOfUnreadMessages: false
    }
  },
  methods: {
    updateNrOfUnreadMessages(nrOfUnreadMessages) {
      this.nrOfUnreadMessages = nrOfUnreadMessages
      this.showNrOfUnreadMessages = nrOfUnreadMessages > 0;
    },

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
    this.updateNrOfUnreadMessages()
  }
})

</script>