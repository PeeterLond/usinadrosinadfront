<template>
  <div>
    <Modal ref="modalRef">
      <template #header>
        Lisa tagasiside:
      </template>
      <template #body>
                <AlertDanger class="justify-content-center" :alert-message="errorResponse.message"/>
                <AlertSuccess class="justify-content-center" :alert-message="successMessage"/>
        <td colspan="10">
          <div>
            <textarea v-model="feedbackRequest.feedbackComment" cols="50" rows="5"></textarea>
          </div>
        </td>
        <tr class="feedback-stars">
          <td v-for="starRating in 5" :key="starRating" @click="updateRating(starRating)">
            <font-awesome-icon :icon="['fas', 'star']" size="lg" :class="{ 'selected': starRating <= feedbackRequest.feedbackRating,
             'unselected': starRating > feedbackRequest.feedbackRating }"/>
          </td>
        </tr>
      </template>
      <template #footer>
        <button @click="closeModal" type="submit" class="btn btn-dark">Tagasi</button>
        <button @click="addUserFeedback" type="submit" class="btn btn-dark">Lisa</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import {useRoute} from "vue-router";
import {
  FEEDBACK_RATING_REQUIRED,
  FEEDBACK_SUCCESSFULLY_ADDED,
} from "@/assets/script/AlertMessage";
import router from "@/router";

export default {
  name: 'FeedbackModal',
  components: { AlertSuccess, AlertDanger, Modal},

  data() {
    return {
      receiverUserId: Number(useRoute().query.userId),
      feedbackRequest: {
        receiverUserId: 0,
        feedbackRating: 0,
        feedbackComment: ''
      },
      successMessage: '',
      errorResponse: {
        message: '',
        errorCode: 0
      },
    }
  },
  methods: {
    closeModal() {
      this.$refs.modalRef.closeModal()
    },
    updateRating(starRating) {
      this.feedbackRequest.feedbackRating = starRating;
    },
    addUserFeedback() {
          this.errorResponse.message = ''
          this.successMessage = ''
          this.feedbackRequest.receiverUserId = this.receiverUserId
          if(this.mandatoryFieldsAreFilled()) {
            this.sendAddUserFeedbackRequest()
            setTimeout( () => {
              this.$refs.modalRef.closeModal()
              window.location.reload()
            },2500)
          } else {
            this.errorResponse.message = FEEDBACK_RATING_REQUIRED
          }

    },
    mandatoryFieldsAreFilled() {
      return this.feedbackRequest.feedbackRating > 0;
    },

    sendAddUserFeedbackRequest() {
      this.$http.post("/feedback", this.feedbackRequest
      ).then(response => {
        this.successMessage = FEEDBACK_SUCCESSFULLY_ADDED
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    }
  }

}
</script>

