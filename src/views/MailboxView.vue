<template>
  <ViewMessageModal ref="viewMessageModalRef"/>
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
    <tr v-for="message in messagesRequest" @click="openViewMessageModal(message)" >
      <td :for="message.senderUserUsername">{{ message.senderUserUsername }}</td>
      <td :for="message.receiverUserUsername">{{ message.receiverUserUsername }}</td>
      <td :for="message.messageLetterTitle">{{ message.messageLetterTitle }}</td>
      <td :for="message.messageLetterTime">{{ message.messageLetterTime }}</td>
      <td>
        <button type="submit">Vasta</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>


<script>
import router from "@/router";
import EditPasswordModal from "@/components/modal/EditPasswordModal.vue";
import ViewMessageModal from "@/components/modal/ViewMessageModal.vue";

export default {
  name: 'MailboxView',
  components: {ViewMessageModal, EditPasswordModal},
  data() {
    return {
      userId: sessionStorage.getItem('userId'),
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
              userId: this.userId,
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
    }

  },
  beforeMount() {
    this.getMessages()
  }
}
</script>


