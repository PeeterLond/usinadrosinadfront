<template>
    <Modal ref="modalRef">
      <template #header>
        <input v-model="messageRequest.messageLetterTitle" placeholder="Pealkiri" type="text" class="answer-modal-header">
      </template>
      <template #body>
        <AlertDanger class="justify-content-center" :alert-message="errorResponse.message"/>
        <div class="mb-3">
          <h6>From: {{ messageRequest.senderUserUsername }}</h6>
          <h6>To: {{ messageRequest.receiverUserUsername }}</h6>
          <label for="message-text" class="col-form-label">Sõnum:</label>
          <textarea class="form-control" v-model="messageRequest.messageLetterBody"></textarea>
        </div>
      </template>
      <template #footer>
        <button class="btn btn-dark" v-if="!messageSent" @click="validateAndSendMessage">{{sendButton}}</button>
      </template>
    </Modal>
</template>

<script>

import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import {MESSAGE_MISSING} from "@/assets/script/AlertMessage";

export default {
  name: 'AnswerMessageModal',
  components: {AlertDanger, Modal},
  data() {
    return {
      messageSent: false,
      sendButton: 'Vasta',
      messageRequest: {
        messageLetterTitle: '',
        messageLetterBody: '',
        senderUserId: 0,
        senderUserUsername: '',
        receiverUserId: 0,
        receiverUserUsername: ''
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {
    resetErrorMessage() {
      this.errorResponse.message = ''
    },

    sendResponseMessage() {
      this.$http.post("mailbox", this.messageRequest,
      ).then(response => {
        this.messageSent = true
        setTimeout(() => {
          this.$refs.modalRef.closeModal()
          window.location.reload()
        }, 500);
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    validateAndSendMessage() {
      if (this.messageRequest.messageLetterBody.length > 0) {
        this.sendResponseMessage()
      } else {
        this.errorResponse.message = MESSAGE_MISSING;
      }
    }
  }
}
</script>


