<template>
  <div class="advertisements-master">
    <div class="advertisements-filter">
      <div>
        <CountyDropdown @event-update-selected-county-id="setFilterCountyId"></CountyDropdown>
      </div>
      <div>
        <CityDropdown @event-update-selected-city-id="setFilterCityId" ref="cityDropdownRef"></CityDropdown>
      </div>
      <div>
        <TypeDropdown @event-update-selected-type-id="setFilterTypeId"></TypeDropdown>
      </div>
      <div>
        <ToolDropdown @event-update-selected-tool-id="setFilterToolId" />
      </div>
      <div>
        <button @click="filterAdvertisements" class="btn btn-dark mt-3" type="submit">Filtreeri</button>
      </div>
    </div>
    <div class="leaflet-map">
      <LeafletMap ref="leafletMapRef"></LeafletMap>
    </div>
    <div class="advertisements-inner">
      <div class="advertisements-sort">
        <div class="sort-header">
          Hind:
        </div>
        <div class="sort-arrow">
          <font-awesome-icon :icon="['fas', 'arrow-down']" @click="sortPriceDescending" size="lg" style="color: #000000;" class="me-2" />
        </div>
        <div class="sort-arrow">
          <font-awesome-icon :icon="['fas', 'arrow-up']" @click="sortPriceAscending" size="lg" style="color: #000000;" />
        </div>
        <div class="sort-header">
          Uuemad:
        </div>
        <div class="sort-arrow">
          <font-awesome-icon :icon="['fas', 'arrow-down']" @click="sortOldest" size="lg" style="color: #000000;" class="me-2" />
        </div>
        <div class="sort-arrow">
          <font-awesome-icon :icon="['fas', 'arrow-up']" @click="sortNewest" size="lg" style="color: #000000;" />
        </div>
      </div>
      <div class="advertisements-ads">
        <Advertisement @event-zoom-to-location-on-map="handleZoomToLocation" :advertisement-response="advertisementResponse"/>
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
import LeafletMap from "@/components/LeafletMap.vue";

export default {
  name: 'AdvertisementsView',
  components: {LeafletMap, ToolDropdown, TypeDropdown, CityDropdown, CountyDropdown, Advertisement},
  data() {
    return {
      advertisementsFilterRequest: {
        countyId: 0,
        cityId: 0,
        toolId: 0,
        typeId: 0
      },
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
    handleZoomToLocation(ad) {
      this.$refs.leafletMapRef.zoomInToLocationOnMap(ad)
    },

    filterAdvertisements() {
      this.$http.get("/advertisement-with-contact-filter", {
            params: {
              countyId: this.advertisementsFilterRequest.countyId,
              cityId: this.advertisementsFilterRequest.cityId,
              toolId: this.advertisementsFilterRequest.toolId,
              typeId: this.advertisementsFilterRequest.typeId
            }
          }
      ).then(response => {
        this.advertisementResponse = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },


    setFilterToolId(toolId) {
      this.advertisementsFilterRequest.toolId = toolId
    },

    setFilterTypeId(typeId) {
      this.advertisementsFilterRequest.typeId = typeId
    },

    setFilterCityId(cityId) {
      this.advertisementsFilterRequest.cityId = cityId
    },
    
    setFilterCountyId(countyId) {
      this.advertisementsFilterRequest.countyId = countyId

      this.$refs.cityDropdownRef.selectedCountyId = countyId;
      this.$refs.cityDropdownRef.getCities()
    },

    sortPriceAscending() {
      this.advertisementResponse.sort((a, b) => a.advertisementPrice - b.advertisementPrice)
    },

    sortPriceDescending() {
      this.advertisementResponse.sort((a, b) => b.advertisementPrice - a.advertisementPrice)
    },

    sortNewest() {
      this.advertisementResponse.sort((a, b) => new Date(a.advertisementTime) - new Date(b.advertisementTime))
    },

    sortOldest() {
      this.sortNewest()
      this.advertisementResponse.reverse()
    },

    getAllAdvertisementsWithContactInfo() {
      this.$http.get("/advertisement-with-contact")
          .then(response => {
            this.advertisementResponse = response.data
            this.sortOldest()
            this.$refs.leafletMapRef.advertisementResponse = this.advertisementResponse
            this.$refs.leafletMapRef.addLocationsToMap()
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