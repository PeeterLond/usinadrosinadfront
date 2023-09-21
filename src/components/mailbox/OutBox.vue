<template>
  <ViewMessageModal ref="viewMessageModalRef"></ViewMessageModal>
  <h6>Saadetud kirjad:</h6>
  <table>
    <thead>
    <tr>
      <th>Saaja</th>
      <th>Pealkiri</th>
      <th>Kuupäev</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="message in messagesResponse" @click="openViewMessageModal(message)" class="message-hover">
      <td>{{message.receiverUserUsername}}</td>
      <td>{{message.messageLetterTitle}}</td>
      <td>{{getDateFromTimeStamp(message.letterTime)}}</td>
    </tr>
    </tbody>
  </table>
</template>
<script>
import router from "@/router";
import ViewMessageModal from "@/components/modal/ViewMessageModal.vue";

export default {
  name: 'OutBox',
  components: {ViewMessageModal},
  props: {
    currentUserId: Number
  },
  data() {
    return{
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
      ]
    }
  },
  methods:{
    getDateFromTimeStamp(timestamp) {
      return timestamp.split("T")[0]
    },

    getSentMessages() {
      this.$http.get("/mailbox-sent", {
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
    openViewMessageModal(message) {
      this.$refs.viewMessageModalRef.$refs.modalRef.openModal()
      this.$refs.viewMessageModalRef.message = message
      this.$refs.viewMessageModalRef.hide = true
    }
  },
  beforeMount() {
    this.getSentMessages()

  }
}
</script>