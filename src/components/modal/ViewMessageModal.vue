<template>
  <Modal ref="modalRef">
    <template #header>
      {{ message.messageLetterTitle }}
    </template>
    <template #body>
      <h6>From: {{ message.senderUserUsername }}</h6>
      <h6>To: {{ message.receiverUserUsername }}</h6>
      <div class="fs-4">{{ message.messageLetterBody }}</div>
    </template>
    <template #footer>
      <button class="btn btn-dark" type="submit" @click="closeModal">Tagasi</button>
      <button v-if="!hide" class="btn btn-dark" @click="openAnswerModal">Vasta</button>
    </template>
  </Modal>
</template>

<script>

import Modal from "@/components/modal/Modal.vue";
import AnswerMessageModal from "@/components/modal/AnswerMessageModal.vue";

export default {
  name: 'ViewMessageModal',
  components: {AnswerMessageModal, Modal},
  data() {
    return {
      hide: false,
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
  methods: {
    closeModal() {
      this.$refs.modalRef.closeModal()
    },
    openAnswerModal() {
      this.$refs.modalRef.closeModal()
      this.$emit("event-open-answer-modal", this.message)
    }
  }
}
</script>