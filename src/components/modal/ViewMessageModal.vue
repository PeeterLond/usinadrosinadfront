<template>
  <div>
    <AnswerMessageModal ref="answerMessageModalRef">
    </AnswerMessageModal>
      <Modal ref="modalRef">
        <template #header class="fs-2">
          {{ message.messageLetterTitle }}
        </template>
        <template #body>
          <h6>From: {{ message.senderUserUsername }}</h6>
          <h6>To:{{ message.receiverUserUsername }}</h6>
          <div class="fs-4">{{ message.messageLetterBody }}</div>

        </template>
        <template #footer>
          <button type="submit" @click="close">Tagasi</button>
          <button class="btn btn-dark" @click="openAnswerModal">Vasta</button>
        </template>
      </Modal>

  </div>

</template>

<script>

import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import AnswerMessageModal from "@/components/modal/AnswerMessageModal.vue";

export default {
  name: 'ViewMessageModal',
  methods: {
    router() {
      return router
    },
    close() {
      this.$refs.modalRef.closeModal()
    },
    openAnswerModal() {
      this.$refs.modalRef.closeModal()
      this.$refs.answerMessageModalRef.$refs.modalRef.openModal()
      this.$refs.answerMessageModalRef.message = this.message
      this.$refs.answerMessageModalRef.handleNewMessageInfo()
    },
  },
  components: {AnswerMessageModal, Modal},
  data() {
    return {
      message: {
        messageLetterTitle: '',
        messageLetterBody: '',
        messageLetterTime: '',
        senderUserUsername: '',
        receiverUserUsername: '',
        senderUserId: '',
        receiverUserId: '',
        isRead: false
      }
    }
  },
}
</script>