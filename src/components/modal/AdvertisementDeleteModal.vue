<template>
  <Modal ref="ModalRef">
    <template #header>
      Kuulutuse kustutamine
    </template>
    <template #body>
      <AlertSuccess :alert-message="successMessage"></AlertSuccess>
      <h4>Kas oled ikka kindel, et soovid enda kuulutuse kustutada?</h4>
    </template>
    <template #footer>
      <div class="delete-modal-footer">
        <div>
          <button @click="closeModal" type="submit" class="btn btn-dark">Katkesta</button>
        </div>
        <div>
          <button @click="handleAdvertisementDelete" type="submit" class="btn btn-dark">Kustuta</button>
        </div>
      </div>
    </template>

  </Modal>

</template>

<script>

import {defineComponent} from "vue";
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import {ADVERTISEMENT_DELETED} from "@/assets/script/AlertMessage";

export default defineComponent({
  components: {AlertSuccess, Modal},
  data() {
    return {
      advertisementId: '',
      successMessage: ''
    }
  },
  methods: {
    handleAdvertisementDelete() {
      this.deleteAdvertisementChores()
      this.deleteAdvertisement()
      this.successMessage = ADVERTISEMENT_DELETED
      setTimeout( () => {
        this.closeModal()
        window.location.reload()
      },2500)
    },
    deleteAdvertisementChores() {
      this.$http.delete("/advertisement-chores", {
            params: {
              advertisementId: this.advertisementId
            }
          }
      ).then(response => {
        const responseBody = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
    deleteAdvertisement() {
      this.$http.delete("/advertisement", {
            params: {
              advertisementId: this.advertisementId
            }
          }
      ).then(response => {
        const responseBody = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
    closeModal() {
      this.$refs.ModalRef.closeModal()
    },
  }
})
</script>
