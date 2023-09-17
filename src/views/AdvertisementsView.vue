<template>
  <div class="advertisements-master">
    <Advertisement :advertisement-response="advertisementResponse"/>
  </div>

</template>

<script>


import router from "@/router";
import {ADVERTISEMENTS_IMAGE} from "@/assets/script/ImageSizes";
import Advertisement from "@/components/Advertisement.vue";
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'AdvertisementsView',
  components: {Modal, Advertisement},
  data() {
    return {
      advertisementResponse: [
        {
          advertisementId: 0,
          userId: 0,
          countyName: '',
          cityName: '',
          toolName: '',
          typeName: '',
          coordinateId: 0,
          coordinateLongField: 0,
          coordinateLat: 0,
          advertisementDescription: '',
          advertisementArea: 0,
          advertisementPrice: 0,
          advertisementTime: '',
          contactFirstName: '',
          contactLastName: '',
          contactCountyName: '',
          contactCityName: '',
          contactImageData: '',
          contactMobileNumber: '',
          contactEmail: ''
        }
      ]

    }
  },
  methods: {
    getAllAdvertisementsWithContactInfo() {
      this.$http.get("/advertisement-with-contact")
          .then(response => {
            this.advertisementResponse = response.data
          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
    },
  },
  beforeMount() {
    this.getAllAdvertisementsWithContactInfo()
  }

}
</script>