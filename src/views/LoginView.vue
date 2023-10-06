<template>
  <div class="login-master">
    <div class="login-item">
      <AlertDanger :alert-message="errorResponse.message"/>
    </div>
    <div class="login-item">
      <input v-model="username" type="text" placeholder="Kasutajanimi">
    </div>
    <div class="login-item">
      <input v-model="password" type="password" placeholder="Salasõna">
    </div>
    <div class="login-item">
      <button @click="login" class="btn btn-dark mb-4" type="submit">Logi sisse</button>
    </div>
    <div class="login-item">
      <router-link class="black-item" to="/user"><p>Registreeri kasutaja</p></router-link>
      <router-link class="black-item" to="/resetPassword"><p>Unustasid salasõna?</p></router-link>
    </div>
  </div>
</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import {FILL_MANDATORY_FIELDS} from "@/assets/script/AlertMessage";
import {INCORRECT_CREDENTIALS} from "@/assets/script/ErrorCode";
import router from "@/router";

export default {
  name: 'LoginView',
  components: {AlertDanger},
  data() {
    return {
      username: '',
      password: '',
      loginResponse: {
        userId: 0,
        username: '',
        roleName: ''
      },
      errorResponse: {
        message: '',
        errorCode: 0
      },
    }
  },
  methods: {

    login() {
      this.resetErrorMessage();
      if (this.mandatoryFieldsAreFilled()) {
        this.sendLoginRequest();
      } else {
        this.errorResponse.message = FILL_MANDATORY_FIELDS
      }
      this.resetPassword();
    },

    resetErrorMessage() {
      this.errorResponse.message = ''
    },

    mandatoryFieldsAreFilled() {
      return this.username.length > 0 && this.password.length > 0
    },

    resetPassword() {
      this.password = ''
    },

    sendLoginRequest() {
      this.$http.get("/login", {
            params: {
              username: this.username,
              password: this.password
            }
          }
      ).then(response => {
        this.loginResponse = response.data
        sessionStorage.setItem('userId', this.loginResponse.userId)
        sessionStorage.setItem('roleName', this.loginResponse.roleName)
        sessionStorage.setItem('userName', this.loginResponse.username)
        this.$emit('event-update-nav-menu')
        router.push({name: 'dashboardRoute'})

      }).catch(error => {
        this.errorResponse = error.response.data
        if (this.errorResponse.errorCode !== INCORRECT_CREDENTIALS) {
          router.push({name: 'errorRoute'})
        }
      })

    },
  }
}
</script>
