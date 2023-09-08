<template>
  <header>
      <div class="row">
        <div class="col col-1 text-center">
          <img src="../src/assets/logo.png" alt="ettevõtte logo" id="companyLogo">
        </div>
        <div class="col col-9 m-3">
          <h1>Usinad Rosinad</h1>
        </div>
        <div class="col d-flex justify-content-center">
          <router-link v-if="!loggedIn" to="/login"><button type="button" class="btn btn-light m-3" >Logi sisse</button></router-link>
          <router-link v-else @click="handleLogOut" to="/"><button type="button" class="btn btn-danger m-3" >Logi välja</button></router-link>
        </div>
      </div>
  </header>
  <nav v-if="loggedIn">
    <div class="row">
      <div class="col col-1 d-flex justify-content-center">
        <router-link to="/">Kodu</router-link>
      </div>
      <div class="col col-1 d-flex justify-content-center">
        <router-link to="/">Kuulutused</router-link>
      </div>
      <div class="col col-1 d-flex justify-content-center">
        <router-link to="/dashboard">Minu töölaud</router-link>
      </div>
      <div class="col col-1 d-flex justify-content-center">
        <router-link to="/">Minu sõnumid</router-link>
      </div>
    </div>
  </nav>
<main>
  <router-view @event-update-nav-menu="updateNavMenu"></router-view>
</main>
 <footer>
   <div class="row">
     <div class="col col-9 d-flex justify-content-end">
      FB, Insta ja meili logo
     </div>
     <div class="col">
      <p> Usinad Rosinad OÜ</p>
       <p> Reg.nr 314159265</p>
       <p>  AA: EE3141592658979323</p>
       <p> Usina tn 1, Rosina maakond</p>
     </div>
   </div>
 </footer>
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
    },
    router() {
      return router
    }
  }
})

</script>