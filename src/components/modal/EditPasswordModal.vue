<template>
  <div>
    <Modal ref="modalRef">

      <template #header>
        Muuda salasõna:
      </template>

      <template #body>

        <AlertDanger class="justify-content-center" :alert-message="errorResponse.message"/>
        <AlertSuccess class="justify-content-center" :alert-message="successMessage"/>

        <tr>
          <td><label for="password">Uus salasõna</label></td>
          <td><input v-model="inputPassword1" type="password" id="password"></td>
        </tr>
        <tr>
          <td><label for="password">Salasõna uuesti</label></td>
          <td><input v-model="inputPassword2" type="password" id="password"></td>
        </tr>
      </template>

      <template #footer>
        <button @click="this.$refs.modalRef.closeModal()" type="submit" class="btn btn-dark">Tagasi</button>
        <button @click="validateAndUpdatePassword" type="submit" class="btn btn-dark">Muuda</button>

      </template>

    </Modal>
  </div>

</template>

<script>

import Modal from "@/components/modal/Modal.vue";
import {FILL_MANDATORY_FIELDS, PASSWORD_SUCCESSFULLY_UPDATED, PASSWORDS_DONT_MATCH} from "@/assets/script/AlertMessage";
import {useRoute} from "vue-router";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: 'EditPasswordModal',
  components: {AlertSuccess, AlertDanger, Modal},

  data() {
    return {
      currentUserId: Number(useRoute().query.userId),
      inputPassword1: '',
      inputPassword2: '',
      successMessage: '',
      errorResponse: {
        message: '',
        errorCode: 0
      },
      userPasswordChange: {
        userPassword: ''
      }

    }
  },
  methods: {
    validateAndUpdatePassword() {
      this.errorResponse.message = ''
      this.successMessage = ''
      if (!this.mandatoryFieldsAreFilled()) {
        this.errorResponse.message = FILL_MANDATORY_FIELDS
      } else if (!this.passwordsAreSame()) {
        this.errorResponse.message = PASSWORDS_DONT_MATCH;
      } else {
        this.userPasswordChange.userPassword = this.inputPassword1
        this.sendUpdatePasswordRequest()
      }
    },

    mandatoryFieldsAreFilled() {
      return this.inputPassword1.length > 0 && this.inputPassword2.length > 0
    },

    passwordsAreSame() {
      return this.inputPassword1 === this.inputPassword2
    },

    sendUpdatePasswordRequest() {
      this.$http.patch("/user", this.userPasswordChange, {
            params: {
              userId: this.currentUserId,
            }
          }
      ).then(response => {
        this.successMessage = PASSWORD_SUCCESSFULLY_UPDATED;
        setTimeout(() => {
          this.$refs.modalRef.closeModal()
        }, 2000);
      }).catch(error => {
        this.errorResponse = error.response.data;
      })
    },
  }
}


</script>
