<template>
  <ViewMessageModal @event-open-answer-modal="openAnswerMessageModal" ref="viewMessageModalRef"></ViewMessageModal>
  <AnswerMessageModal ref="answerMessageModalRef"></AnswerMessageModal>
  <h6>Saadud kirjad:</h6>
  <table>
    <thead>
    <tr>
      <th>Saatja</th>
      <th>Pealkiri</th>
      <th>Kuupäev</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="message in messagesResponse" @click="openViewMessageModal(message)" v-bind:style="message.isRead ? 'font-weight: normal;' : 'font-weight: bold;'" class="message-hover" >
      <td>{{message.senderUserUsername}}</td>
      <td>{{message.letterTitle}}</td>
      <td>{{getDateFromTimeStamp(message.letterTime) }}</td>
      <td>
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
    return {
      messagesResponse: [
        {
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
      ],
      messageRequest:
          {
            messageLetterTitle: '',
            messageLetterBody: '',
            senderUserId: 0,
            senderUserUsername: '',
            receiverUserId: 0,
            receiverUserUsername: ''
          }
    }
  },

  methods: {
    getDateFromTimeStamp(timestamp) {
      return timestamp.split("T")[0]
    },

    openViewMessageModal(message) {
      this.$refs.viewMessageModalRef.openModal()
      this.$refs.viewMessageModalRef.message = message
      if (!message.isRead) {
        this.sendMessageIsRead(message.messageId)
      }
    },

    sendMessageIsRead(messageId) {
      this.$http.patch("/mailbox", null, {
            params: {
              messageId: messageId
            }
          }
      ).then(response => {
        const responseBody = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    openAnswerMessageModal(message) {
      event.stopPropagation()
      this.resetAnswerModalErrorMessage();
      this.$refs.answerMessageModalRef.$refs.modalRef.openModal()
      this.reverseSenderInfo(message)
      this.$refs.answerMessageModalRef.messageRequest = this.messageRequest
    },

    resetAnswerModalErrorMessage() {
      this.$refs.answerMessageModalRef.errorResponse.message = ''
    },

    reverseSenderInfo(message) {
      this.messageRequest.messageLetterTitle = message.letterTitle
      this.messageRequest.messageLetterBody = ""
      this.messageRequest.senderUserId = message.receiverUserId
      this.messageRequest.senderUserUsername = message.receiverUserUsername
      this.messageRequest.receiverUserId = message.senderUserId
      this.messageRequest.receiverUserUsername = message.senderUserUsername
    },

    getReceivedMessages() {
      this.$http.get("/mailbox-receive", {
            params: {
              userId: this.currentUserId
            }
          }
      ).then(response => {
        this.messagesResponse = response.data
        this.$emit("event-update-nr-of-unread-messages", this.getNrOfUnreadMessages())
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    getNrOfUnreadMessages() {
      let nrOfUnreadMessages = 0
      for (const message of this.messagesResponse) {
        if (!message.isRead) {
          nrOfUnreadMessages++
        }
      }
      return nrOfUnreadMessages
    }
  },
  beforeMount() {
    this.getReceivedMessages()
  }
}
</script>