<template>
  <AdvertisementDeleteModal ref="AdvertisementDeleteModalRef"></AdvertisementDeleteModal>
  <Modal ref="modalRef">
    <template #header>
      <h2>{{ ad.typeName }}</h2>
    </template>
    <template #body>
      <div class="ad-modal-master">
        <div class="ad-modal-profile">
          <div>
            <UserImage :image-data-base64="ad.contactImageData" :img-height="AD_MODAL_IMAGE.height"
                       :img-width="AD_MODAL_IMAGE.width">
            </UserImage>
          </div>
          <div>
            <div>
              {{ ad.contactFirstName }} {{ ad.contactLastName }}
            </div>
            <div>
              {{ ad.contactCountyName }} {{ ad.contactCityName }}
            </div>
            <div>
              {{ ad.contactMobileNumber }}
            </div>
            <div>
              {{ ad.contactEmail }}
            </div>
          </div>
          <div>
            <font-awesome-icon :icon="['fas', 'star']" style="color: #fff700;"/>
            5.0
          </div>
        </div>
        <div class="ad-modal-description">
          {{ ad.advertisementDescription }}
        </div>
        <div class="ad-modal-info">
          <div>Tunnihind: {{ ad.advertisementPrice }}€/h</div>
          <div v-if="ad.advertisementArea > 0">Pindala: {{ad.advertisementArea}}m<sup>2</sup></div>
          <div v-else>Pindala: </div>
          <div>{{ad.toolName}}</div>
          <div>Maakond: {{ad.countyName}}</div>
          <div v-if="ad.cityName !== ''">Linn: {{ad.cityName}}</div>
          <div v-else>Linn: </div>

        </div>
        <div class="mt-2">
          Teenused:
        </div>
        <div class="ad-modal-chores">
          <p v-for="chore in choreResponse">
            {{chore.choreName}}
          </p>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="ad-modal-footer">
        <div>
          <button @click="closeAdvertisementModal" type="submit" class="btn btn-dark">Tagasi</button>
        </div>
        <div>
          <button v-if="isLoggedIn && !isCurrentUserAd" type="submit" class="btn btn-dark">Saada sõnum</button>
          <button v-if="isCurrentUserAd" @click="handleAdvertisementEdit" type="submit" class="btn btn-dark">Muuda</button>
        </div>
        <div>
          <button v-if="isLoggedIn && !isCurrentUserAd" @click="goToAdvertisementUserDashboard" type="submit" class="btn btn-dark">Mine kasutaja profiilile</button>
          <button v-if="isCurrentUserAd" @click="openAdvertisementDeleteModal" type="submit" class="btn btn-dark">Kustuta</button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>

import {defineComponent} from "vue";
import Modal from "@/components/modal/Modal.vue";
import UserImage from "@/components/image/UserImage.vue";
import {AD_MODAL_IMAGE} from "@/assets/script/ImageSizes";
import router from "@/router";
import AdvertisementDeleteModal from "@/components/modal/AdvertisementDeleteModal.vue";
import {useRoute} from "vue-router";

export default defineComponent({
  computed: {
    AD_MODAL_IMAGE() {
      return AD_MODAL_IMAGE
    }
  },
  components: {AdvertisementDeleteModal, UserImage, Modal},
  data() {
    return {
      isLoggedIn: false,
      isCurrentUserAd: false,
      currentUserId: Number(sessionStorage.getItem('userId')),
      anotherUserId: Number(useRoute().query.userId),
      isAnotherUserDashboard: false,
      ad: {},
      choreResponse: [
        {
          adChoreId: 0,
          choreName: ''
        }
      ]
    }
  },
  methods: {
    goToAdvertisementUserDashboard() {
      router.push({name: 'dashboardRoute', query: {userId: this.ad.userId}})
    },
    handleAdvertisementEdit() {
      router.push({name: 'advertisementRoute', query: {advertisementId: this.ad.advertisementId, edit: 1}})

    },
    openAdvertisementDeleteModal() {
      this.closeAdvertisementModal()
      this.$refs.AdvertisementDeleteModalRef.advertisementId = this.ad.advertisementId
      this.$refs.AdvertisementDeleteModalRef.$refs.ModalRef.openModal()
    },
    checkIfAdUserIsSameAsCurrentUser() {
      this.isAnotherUserDashboard = !isNaN(this.anotherUserId)
      if (this.isAnotherUserDashboard) {
        this.isCurrentUserAd = false;
      } else {
        this.isCurrentUserAd = this.currentUserId === this.ad.userId;
      }
    },
    checkIfLoggedIn() {
      this.isLoggedIn = this.currentUserId > 0
    },

    closeAdvertisementModal() {
      this.$refs.modalRef.closeModal()
    },
    getAdvertisementChores() {
      this.$http.get("/advertisement-chore", {
            params: {
              advertisementId: this.ad.advertisementId,
            }
          }
      ).then(response => {
        this.choreResponse = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

  }
})
</script>
