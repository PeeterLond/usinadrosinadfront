<template>
    <Modal ref="modalRef">
      <template #header>
        {{ messageRequest.messageLetterTitle }}
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
        <button class="btn btn-dark" v-if="!messageSent" @click="validateAndSendMessage">Vasta</button>
      </template>
    </Modal>
</template>

<script>

import Modal from "@/components/modal/Modal.vue";
import ViewMessageModal from "@/components/modal/ViewMessageModal.vue";
import router from "@/router";
import MailboxView from "@/views/MailboxView.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import {MESSAGE_MISSING} from "@/assets/script/AlertMessage";

export default {
  name: 'AnswerMessageModal',
  components: {AlertDanger, MailboxView, ViewMessageModal, Modal},
  data() {
    return {
      messageSent: false,
      messageRequest: {
        messageLetterTitle: '',
        messageLetterBody: '',
        messageLetterTime: '',
        senderUserUsername: '',
        receiverUserUsername: '',
        senderUserId: '',
        receiverUserId: '',
        isRead: false
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {
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


