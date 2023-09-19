<template>
  <div>
    <MailboxView ref="mailboxViewRef"/>
    <AlertSuccess :alert-message="successMessage"/>
    <Modal ref="modalRef">
      <template #header>
        {{ message.messageLetterTitle }}
      </template>
      <template #body>
        <div class="mb-3">
          <h6>From: {{ message.senderUserUsername }}</h6>
          <h6>To:{{ message.receiverUserUsername }}</h6>
          <label for="message-text" class="col-form-label">Sõnum:</label>
          <textarea class="form-control" v-model="message.messageLetterBody"></textarea>
        </div>
      </template>
      <template #footer>
        <button class="btn btn-dark" v-if="messageSent">Saadetud</button>
        <button class="btn btn-dark" v-else @click="sendResponseMessage">Vasta</button>
      </template>
    </Modal>
  </div>

</template>

<script>

import Modal from "@/components/modal/Modal.vue";
import ViewMessageModal from "@/components/modal/ViewMessageModal.vue";
import router from "@/router";
import MailboxView from "@/views/MailboxView.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import {PASSWORD_SUCCESSFULLY_UPDATED} from "@/assets/script/AlertMessage";

export default {
  name: 'AnswerMessageModal',
  components: {AlertSuccess, MailboxView, ViewMessageModal, Modal},
  data() {
    return {
      messageSent: false,
      message: {
        messageLetterTitle: '',
        messageLetterBody: '',
        messageLetterTime: '',
        senderUserUsername: '',
        receiverUserUsername: '',
        senderUserId: '',
        receiverUserId: '',
        isRead: false
      },
    }
  },
  methods: {
    sendResponseMessage() {
      this.$http.post("mailbox", this.message,
      ).then(response => {
        this.messageSent = true
        setTimeout(() => {
          this.$refs.modalRef.closeModal()
          window.location.reload()
        }, 2000);
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    handleNewMessageInfo() {
      let user = this.message.senderUserUsername
      let id = this.message.senderUserId
      this.message.senderUserUsername = this.message.receiverUserUsername
      this.message.senderUserId = this.message.receiverUserId
      this.message.receiverUserId = id
      this.message.receiverUserUsername = user
      this.message.messageLetterBody = ''
      this.message.isRead = false
    }
  }
}


</script>


