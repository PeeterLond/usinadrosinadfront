<template>
  <select v-model="selectedCityId" @change="emitSelectedCityId" class="dropdowns">
    <option selected :value="0">Vali linn</option>
    <option v-for="city in cityResponse" id="city" :value="city.cityId" :key="city.cityId">{{city.cityName}}</option>
  </select>
</template>
<script>
import router from "@/router";

export default {
  name: 'CityDropdown',
  data() {
    return {
      selectedCountyId: 0,
      selectedCityId: 0,
      cityResponse: [
        {
          cityId: 0,
          countyId: 0,
          cityName: ''
        }
      ]
    }
  },
  methods: {
    getCities() {
      this.$http.get("/cities", {
            params: {
              countyId: this.selectedCountyId,
            }
          }
      ).then(response => {
        this.cityResponse = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
    emitSelectedCityId() {
      this.$emit('event-update-selected-city-id', this.selectedCityId)
    },
  }
}
</script>