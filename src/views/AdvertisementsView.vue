<template>
  <div class="advertisements-master">
    <div class="advertisements-filter">
      <div>
        <CountyDropdown @event-update-selected-county-id="getAdvertisementsByCountyAndSetCountyId"></CountyDropdown>
      </div>
      <div>
        <CityDropdown @event-update-selected-city-id="getAdvertisementsByCity" ref="cityDropdownRef"></CityDropdown>
      </div>
      <div>
        <TypeDropdown @event-update-selected-type-id="getAdvertisementsByType"></TypeDropdown>
      </div>
      <div>
        <ToolDropdown @event-update-selected-tool-id="getAdvertisementsByTool" />
      </div>
    </div>
    <div class="advertisements-inner">
      <div class="advertisements-sort">
        <div class="sort-header">
          Hind:
        </div>
        <div class="sort-arrow">
          <font-awesome-icon :icon="['fas', 'arrow-down']" @click="filterPriceDescending" size="lg" style="color: #000000;" class="me-2" />
        </div>
        <div class="sort-arrow">
          <font-awesome-icon :icon="['fas', 'arrow-up']" @click="filterPriceAscending" size="lg" style="color: #000000;" />
        </div>
        <div class="sort-header">
          Uuemad:
        </div>
        <div class="sort-arrow">
          <font-awesome-icon :icon="['fas', 'arrow-down']" @click="filterOldest" size="lg" style="color: #000000;" class="me-2" />
        </div>
        <div class="sort-arrow">
          <font-awesome-icon :icon="['fas', 'arrow-up']" @click="filterNewest" size="lg" style="color: #000000;" />
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
import Advertisement from "@/components/Advertisement.vue";
import CountyDropdown from "@/components/dropdown/CountyDropdown.vue";
import CityDropdown from "@/components/dropdown/CityDropdown.vue";
import TypeDropdown from "@/components/dropdown/TypeDropdown.vue";
import ToolDropdown from "@/components/dropdown/ToolDropdown.vue";

export default {
  name: 'AdvertisementsView',
  components: {ToolDropdown, TypeDropdown, CityDropdown, CountyDropdown, Advertisement},
  data() {
    return {
      countyId: 0,
      advertisementResponse: [
        {
          advertisementId: 0,
          userId: 0,
          userName: '',
          user_avg_rating: 0,
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
    getAdvertisementsByTool(toolId) {
      if (toolId > 0) {
        this.$http.get("/advertisement-with-contact-by-tool", {
              params: {
                toolId: toolId,
              }
            }
        ).then(response => {
          this.advertisementResponse = response.data
        }).catch(error => {
          router.push({name: 'errorRoute'})
        });
      } else {
        this.getAllAdvertisementsWithContactInfo()
      }
    },

    getAdvertisementsByType(typeId) {
      if (typeId > 0) {
        this.$http.get("/advertisement-with-contact-by-type", {
              params: {
                typeId: typeId,
              }
            }
        ).then(response => {
          this.advertisementResponse = response.data
        }).catch(error => {
          router.push({name: 'errorRoute'})
        })
      } else {
        this.getAllAdvertisementsWithContactInfo()
      }
    },

    getAdvertisementsByCity(cityId) {
      if (cityId > 0) {
        this.$http.get("/advertisement-with-contact-by-city", {
              params: {
                cityId: cityId,
              }
            }
        ).then(response => {
          this.advertisementResponse = response.data
        }).catch(error => {
          router.push({name: 'errorRoute'})
        });
      } else {
        this.getAdvertisementsByCounty()
      }
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