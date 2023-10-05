<template>
  <Modal ref="modalRef">
    <template #header>
      {{message.letterTitle}}
    </template>
    <template #body>
      <h6>From: {{message.senderUserUsername}}</h6>
      <h6>To: {{message.receiverUserUsername}}</h6>
      <div class="fs-4">{{message.letterBody}}</div>
    </template>
    <template #footer>
      <div class="my-modal-footer">
        <button class="btn btn-dark" type="submit" @click="closeModal">Tagasi</button>
        <button v-if="!hide" class="btn btn-dark" @click="openAnswerModal">Vasta</button>
      </div>
    </template>
  </Modal>
</template>

<script>

import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'ViewMessageModal',
  components: {Modal},
  data() {
    return {
      hide: false,
      message: {
        messageId: 0,
        letterTitle: '',
        letterBody: '',
        letterTime: '',
        senderUserId: 0,
        senderUserUsername: '',
        receiverUserId: 0,
        receiverUserUsername: '',
        isRead: false
      }
    }
  },
  methods: {
    closeModal() {
      this.$refs.modalRef.closeModal()
      window.location.reload()
    },

    openModal() {
      this.$refs.modalRef.openModal()
    },

    openAnswerModal() {
      this.$refs.modalRef.closeModal()
      this.$emit("event-open-answer-modal", this.message)
    }
  }
}
</script>