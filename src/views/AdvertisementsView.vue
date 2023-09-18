<template>
  <div class="advertisements-master">
    <div class="advertisements-filter">
      <div>
        <CountyDropdown @event-update-selected-county-id="getAdvertisementsByCountyAndSetCountyId"></CountyDropdown>
      </div>
      <div>
        <CityDropdown @event-update-selected-city-id="getAdventuresByCity" ref="cityDropdownRef"></CityDropdown>
      </div>
    </div>
    <div class="advertisements-inner">
      <div class="advertisements-sort">
        <div class="sort-header">
          Hind:
        </div>
        <div class="sort-arrow">
          <font-awesome-icon :icon="['fas', 'arrow-down']" @click="filterPriceDescending" size="xl" style="color: #000000;" />
        </div>
        <div class="sort-arrow">
          <font-awesome-icon :icon="['fas', 'arrow-up']" @click="filterPriceAscending" size="xl" style="color: #000000;" />
        </div>
        <div class="sort-header">
          Uuemad:
        </div>
        <div class="sort-arrow">
          <font-awesome-icon :icon="['fas', 'arrow-down']" @click="filterOldest" size="xl" style="color: #000000;" />
        </div>
        <div class="sort-arrow">
          <font-awesome-icon :icon="['fas', 'arrow-up']" @click="filterNewest" size="xl" style="color: #000000;" />
        </div>
      </div>
      <div class="advertisements-ads">
        <Advertisement :advertisement-response="advertisementResponse"/>
      </div>
    </div >
  </div>
</template>

<script>


import router from "@/router";
import {ADVERTISEMENTS_IMAGE} from "@/assets/script/ImageSizes";
import Advertisement from "@/components/Advertisement.vue";
import Modal from "@/components/modal/Modal.vue";
import CountyDropdown from "@/components/CountyDropdown.vue";
import CityDropdown from "@/components/CityDropdown.vue";

export default {
  name: 'AdvertisementsView',
  components: {CityDropdown, CountyDropdown, Modal, Advertisement},
  data() {
    return {
      countyId: 0,
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
    getAdventuresByCity(cityId) {
      if (cityId > 0) {
        this.getAdvertisementsByCity(cityId);
      } else {
        this.getAdvertisementsByCounty()
      }

    },
    getAdvertisementsByCity(cityId) {
      this.$http.get("/advertisement-with-contact-by-city", {
            params: {
              cityId: cityId,
            }
          }
      ).then(response => {
        this.advertisementResponse = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
    
    getAdvertisementsByCountyAndSetCountyId(countyId) {
      this.countyId = countyId
      if (countyId > 0) {
        this.getAdvertisementsByCounty();
      } else {
        this.getAllAdvertisementsWithContactInfo()
      }

      this.$refs.cityDropdownRef.selectedCountyId = countyId;
      this.$refs.cityDropdownRef.getCities()
    },

    getAdvertisementsByCounty() {
      this.$http.get("/advertisement-with-contact-by-county", {
            params: {
              countyId: this.countyId,
            }
          }
      ).then(response => {
        this.advertisementResponse = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
    filterPriceAscending() {
      this.advertisementResponse.sort((a, b) => a.advertisementPrice - b.advertisementPrice)
    },
    filterPriceDescending() {
      this.advertisementResponse.sort((a, b) => b.advertisementPrice - a.advertisementPrice)
    },
    filterNewest() {
      this.advertisementResponse.sort((a, b) => new Date(a.advertisementTime) - new Date(b.advertisementTime))
    },
    filterOldest() {
      this.filterNewest()
      this.advertisementResponse.reverse()
    },
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