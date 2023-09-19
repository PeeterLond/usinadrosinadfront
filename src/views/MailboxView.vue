<template>
  <ViewMessageModal ref="viewMessageModalRef"/>
  <AnswerMessageModal ref="answerMessageModalRef"/>
  <table class="table table-striped">
    <thead>
    <tr>
      <th scope="col">Kellelt</th>
      <th scope="col">Kellele</th>
      <th scope="col">Pealkiri</th>
      <th scope="col">Kuupäev</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="message in messagesRequest" @click="openViewMessageModal(message)" class="hoverable-link" id="box">
      <td :for="message.senderUserUsername">{{ message.senderUserUsername }}</td>
      <td :for="message.receiverUserUsername">{{ message.receiverUserUsername }}</td>
      <td :for="message.messageLetterTitle">{{ message.messageLetterTitle }}</td>
      <td :for="message.messageLetterTime">{{ message.messageLetterTime }}</td>
      <td>
        <button type="submit" @click="openAnswerMessageModal(message, $event)">Vasta</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>


<script>
import router from "@/router";
import EditPasswordModal from "@/components/modal/EditPasswordModal.vue";
import ViewMessageModal from "@/components/modal/ViewMessageModal.vue";
import AnswerMessageModal from "@/components/modal/AnswerMessageModal.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: 'MailboxView',
  components: {AlertDanger, AlertSuccess, AnswerMessageModal, ViewMessageModal, EditPasswordModal},
  data() {
    return {
      currentUserId: sessionStorage.getItem('userId'),
      successMessage: '',
      messagesRequest: [
        {
          messageLetterTitle: '',
          messageLetterBody: '',
          messageLetterTime: '',
          senderUserUsername: '',
          receiverUserUsername: '',
          senderUserId: '',
          receiverUserId: '',
          isRead: true
        }
      ]
    }
  },
  methods: {
    getMessages() {
      this.$http.get("/mailbox", {
            params: {
              userId: this.currentUserId,
            }
          }
      ).then(response => {
        this.messagesRequest = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
    openViewMessageModal(message) {
      this.$refs.viewMessageModalRef.$refs.modalRef.openModal()
      this.$refs.viewMessageModalRef.message = message
    },
    openAnswerMessageModal(message) {
      event.stopPropagation()
      this.$refs.answerMessageModalRef.$refs.modalRef.openModal()
      this.$refs.answerMessageModalRef.message = message
      this.$refs.answerMessageModalRef.handleNewMessageInfo()
    }
  },
  beforeMount() {
    this.getMessages()
  }
}
</script>


