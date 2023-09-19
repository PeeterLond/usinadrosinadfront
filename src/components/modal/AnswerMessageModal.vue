<template>
  <div>
    <Modal ref="modalRef">
      <template #header>
        {{ message.messageLetterTitle }}
      </template>
      <template #body>
        <div class="mb-3">
          <h6 >From: {{message.senderUserUsername}}</h6>
          <h6>To:{{ message.receiverUserUsername }}</h6>
          <label for="message-text" class="col-form-label">Sõnum:</label>
          <textarea class="form-control" v-model="message.messageLetterBody"></textarea>
        </div>
      </template>
      <template #footer>
        <button class="btn btn-dark" @click="sendResponseMessage">Vasta</button>
      </template>
    </Modal>
  </div>

</template>

<script>

import Modal from "@/components/modal/Modal.vue";
import ViewMessageModal from "@/components/modal/ViewMessageModal.vue";
import router from "@/router";

export default {
  name: 'AnswerMessageModal',
  components: {ViewMessageModal, Modal},
  data() {
    return {
      successMessage: '',
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
        this.successMessage = MESSAGE_SENT
        setTimeout(() => {
          router.push({name: 'mailboxRoute'})
        }, 2500)
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    handleNewMessageInfo() {
      let receiverUsername
      let senderUsername
      receiverUsername = this.message.senderUserUsername
      senderUsername = this.message.receiverUserUsername
      this.message.senderUserUsername = senderUsername
      this.message.receiverUserUsername = receiverUsername
      this.message.messageLetterBody = ''
    }
  },
}


</script>
