<template>
  <div class="reset-password-master">
    <AlertDanger :alert-message="errorResponse.message"></AlertDanger>
    <AlertSuccess :alert-message="successMessage"></AlertSuccess>
    <div>
      <p>Unustasid salasõna?</p>
    </div>
    <div>
      <label class="me-3" for="email">Email</label>
      <input v-model="email" type="text" name="" id="email">
    </div>
    <div>
      <button @click="handleResetPassword" class="btn btn-dark mt-5" type="submit">Saada</button>
    </div>
  </div>

</template>

<script>
import {USER_DOESNT_EXIST} from "@/assets/script/ErrorCode";
import router from "@/router";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import {EMAIL_INCORRECT_FORMAT, PASSWORD_RESET} from "@/assets/script/AlertMessage";

export default {
  name: 'ResetPasswordView',
  components: {AlertSuccess, AlertDanger},
  data() {
    return {
      email: '',
      errorResponse: {
        message: '',
        errorCode: 0
      },
      successMessage: ''
    }
  },

  methods: {
    handleResetPassword() {
      this.resetErrorMessage();
      if (!this.emailHasCorrectFormat()) {
        this.errorResponse.message = EMAIL_INCORRECT_FORMAT
      } else {
        this.resetPassword()
      }
    },

    resetErrorMessage: function () {
      this.errorResponse.message = ''
    },

    resetPassword() {
      this.$http.get("/reset-password", {
            params: {
              email: this.email
            }
          }
      ).then(response => {
        this.successMessage = PASSWORD_RESET
        setTimeout( () => {
          router.push({name: 'loginRoute'})
        }, 2000)
      }).catch(error => {
        this.errorResponse = error.response.data
        if (this.errorResponse.errorCode !== USER_DOESNT_EXIST) {
          router.push({name: 'errorRoute'})
        }
      })
    },
    emailHasCorrectFormat() {
      let emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
      return emailRegex.test(this.email)
    },
  }
}

</script>
