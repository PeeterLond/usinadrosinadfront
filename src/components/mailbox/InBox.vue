<template>
  <ViewMessageModal @event-open-answer-modal="openAnswerMessageModal" ref="viewMessageModalRef"/>
  <AnswerMessageModal ref="answerMessageModalRef"/>

    <h6 class="message-header mt-2">Saadud kirjad:</h6>
    <table>
      <thead>
      <tr>
        <th>Saatja</th>
        <th>Pealkiri</th>
        <th>Kuupäev</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="message in messagesResponse" @click="openViewMessageModal(message)" class="message-hover">
        <td>{{message.senderUserUsername}}</td>
        <td>{{message.messageLetterTitle}}</td>
        <td>{{getDateFromTimeStamp(message.messageLetterTime)}}</td>
        <td class="inbox-button">
          <button @click="openAnswerMessageModal(message, $event)" type="submit" class="btn btn-dark">Vasta</button>
        </td>
      </tr>
      </tbody>
    </table>
</template>
<script>
import router from "@/router";
import AnswerMessageModal from "@/components/modal/AnswerMessageModal.vue";
import ViewMessageModal from "@/components/modal/ViewMessageModal.vue";

export default {
  name: 'InBox',
  components: {ViewMessageModal, AnswerMessageModal},
  props: {
    currentUserId: Number

  },
  data() {
    return{
      messagesResponse: [
        {
          messageLetterTitle: '',
          messageLetterBody: '',
          messageLetterTime: '',
          senderUserUsername: '',
          receiverUserUsername: '',
          senderUserId: 0,
          receiverUserId: 0,
          isRead: false
        }
      ],
      messageRequest:
        {
          messageLetterTitle: '',
          messageLetterBody: '',
          messageLetterTime: '',
          senderUserUsername: '',
          receiverUserUsername: '',
          senderUserId: 0,
          receiverUserId: 0,
          isRead: false
        }
    }
  },
  methods: {
    getDateFromTimeStamp(timestamp) {
       return timestamp.split("T")[0]
    },

    openViewMessageModal(message) {
      this.$refs.viewMessageModalRef.$refs.modalRef.openModal()
      this.$refs.viewMessageModalRef.message = message
    },

    openAnswerMessageModal(message) {
      event.stopPropagation()
      this.$refs.answerMessageModalRef.$refs.modalRef.openModal()
      this.reverseSenderInfo(message)
      this.$refs.answerMessageModalRef.messageRequest = this.messageRequest
    },

    reverseSenderInfo(message) {
      this.messageRequest.messageLetterTitle = message.messageLetterTitle
      this.messageRequest.messageLetterBody = ""
      this.messageRequest.messageLetterTime = message.messageLetterTime
      this.messageRequest.senderUserId = message.receiverUserId
      this.messageRequest.senderUserUsername = message.receiverUserUsername
      this.messageRequest.receiverUserId = message.senderUserId
      this.messageRequest.receiverUserUsername = message.senderUserUsername
      this.messageRequest.isRead = false
    },

    getReceivedMessages() {
      this.$http.get("/mailbox-receive", {
            params: {
              userId: this.currentUserId
            }
          }
      ).then(response => {
        this.messagesResponse = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
  },
  beforeMount() {
    this.getReceivedMessages()
  }
}
</script>