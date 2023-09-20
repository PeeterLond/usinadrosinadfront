<template>
  <Modal ref="ModalRef">
    <template #header>
      Kuulutuse kustutamine
    </template>
    <template #body>
      <h4>{{bodyTitle}}</h4>
    </template>
    <template #footer>
      <div v-if="!isDeleted" class="delete-modal-footer">
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
      bodyTitle: 'Kas oled ikka kindel, et soovid enda kuulutuse kustutada?',
      isDeleted: false
    }
  },
  methods: {
    handleAdvertisementDelete() {
      this.deleteAdvertisementChores()
      this.deleteAdvertisement()
      this.bodyTitle = ADVERTISEMENT_DELETED
      this.isDeleted = true
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
