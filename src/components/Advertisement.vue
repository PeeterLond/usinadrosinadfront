<template>
  <div v-for="ad in advertisementResponse" class="advertisements-item">
    <div class="front">
      <div class="front-item">
        <UserImage :image-data-base64="ad.contactImageData" :img-height="ADVERTISEMENTS_IMAGE.height"
                   :img-width="ADVERTISEMENTS_IMAGE.width" id="advertisement-image-id"></UserImage>
        <div class="front-item-text user-name">{{ad.contactFirstName}} {{ad.contactLastName}}</div>
        <div class="front-item-text">{{ad.typeName}}</div>
        <div class="front-item-text">{{ad.advertisementPrice}}€/h</div>
        <div class="front-item-text">{{ad.countyName}}, {{ad.cityName}}</div>
        <div class="front-item-text rating">
          5.0
          <font-awesome-icon :icon="['fas', 'star']" style="color: #fff700;"/>
        </div>
      </div>

    </div>
    <div class="back">
      {{ad.advertisementDescription}}
    </div>
  </div>
</template>
<script>
import UserImage from "@/components/image/UserImage.vue"
import {ADVERTISEMENTS_IMAGE} from "@/assets/script/ImageSizes";

export default {
  name: 'Advertisement',
  computed: {
    ADVERTISEMENTS_IMAGE() {
      return ADVERTISEMENTS_IMAGE
    }
  },
  components: {UserImage},
  props: {
    advertisementResponse: {}
  }
}
</script>