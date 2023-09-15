<template>
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
    <tr v-for="message in messagesInfo">
      <td :for="message.senderUserUsername">{{ message.senderUserUsername }}</td>
      <td :for="message.receiverUserUsername">{{message.receiverUserUsername}}</td>
      <td :for="message.messageLetterTitle">{{message.messageLetterTitle}}</td>
      <td :for="message.messageLetterTime">{{message.messageLetterTime}}</td>
      <td>
        <button type="submit">Vasta</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>


<script>
import router from "@/router";

export default {
  name: 'MailboxView',
  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      messagesInfo: [
        {
          messageLetterTitle: '',
          messageLetterBody: '',
          messageLetterTime: '',
          senderUserUsername: '',
          receiverUserUsername: '',
          isRead: true
        }
      ]
    }
  },
  methods:{
    getMessages() {
      this.$http.get("/mailbox", {
            params: {
              userId: this.userId,
            }
          }
      ).then(response => {
        this.messagesInfo = response.data
      }).catch(error => {
        router.push({name:'errorRoute'})
      })
    },

  },
  beforeMount() {
    this.getMessages()
  }
}
</script>


