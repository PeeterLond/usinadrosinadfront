<template>
  <div class="advertisement-view-master">
    <div class="advertisement-view-items">
      <h4 class="mb-5">Lisa kuulutus</h4>
      <div v-for="type in typeResponse">
        <input v-model="advertisementRequest.typeId" type="radio" name="radio" :id="type.typeName" :value="type.typeId">
        <label :for="type.typeName">{{type.typeName}}</label>
        <br>
      </div>
    </div>
    <div class="advertisement-view-items">


      <table>
        <tr>
          <td><label for="county">Maakond</label></td>
          <td><CountyDropdown @event-update-selected-county-id="setSelectedCountyId" id="county"/></td>
        </tr>
        <tr>
          <td><label for="city">Linn</label></td>
          <td><CityDropdown @event-update-selected-city-id="setSelectedCityId" ref="cityDropdownRef" id="city"/></td>
        </tr>
        <tr>
          <td><label for="lat">Koordinaadid (laius)</label></td>
          <td><input v-model="advertisementRequest.coordinateLat" type="text" id="lat"></td>
        </tr>
        <tr>
          <td><label for="long">Koordinaadid (pikkus)</label></td>
          <td><input v-model="advertisementRequest.coordinateLongField" type="text" id="long"></td>
        </tr>
        <tr>
          <td><label for="price">Tunnihind</label></td>
          <td><input v-model="advertisementRequest.advertisementPrice" type="text" id="price"></td>
        </tr>
        <tr>
          <td><label for="area">Pindala</label></td>
          <td><input v-model="advertisementRequest.advertisementArea" type="text" id="area"></td>
        </tr>
      </table>



    </div>
    <div class="advertisement-view-items">
      <textarea v-model="advertisementRequest.advertisementDescription" placeholder="Kuulutuse tekst" class="mb-4" cols="50" rows="5"></textarea>
      <div v-for="tool in toolResponse">
        <input v-model="advertisementRequest.toolId" type="radio" name="radio2" :id="tool.toolName" :value="tool.toolId">
        <label :for="tool.toolName">{{tool.toolName}}</label>
        <br>
      </div>
      <div class="mt-5">
        <router-link to="/dashboard"><button class="btn btn-dark m-3" type="submit">Tagasi</button></router-link>
        <button @click="addAdvertisementToUser" class="btn btn-dark m-3" type="submit">Edasi</button>
      </div>
    </div>
  </div>


</template>

<script>
import router from "@/router";
import CountyDropdown from "@/components/CountyDropdown.vue";
import CityDropdown from "@/components/CityDropdown.vue";

export default {
  name: 'AdvertisementView',
  components: {CityDropdown, CountyDropdown},
  data() {
    return {
      advertisementRequest: {
        userId: sessionStorage.getItem('userId'),
        countyId: 0,
        cityId: 0,
        toolId: '',
        typeId: '',
        coordinateLongField: null,
        coordinateLat: null,
        advertisementDescription: '',
        advertisementArea: 0,
        advertisementPrice: 0
      },
      typeResponse: [
        {
          typeId: 0,
          typeName: ''
        }
      ],
      toolResponse: [
        {
          toolId: 0,
          toolName: ''
        }
      ],
      advertisementId: 0,
    }
  },
  methods: {
    addAdvertisementToUser() {
      this.$http.post("/advertisement", this.advertisementRequest
      ).then(response => {
        alert('YEEEEEEEEEEEEEEEEEEE')
        this.advertisementId = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    setSelectedCountyId(selectedCountyId) {
      this.advertisementRequest.countyId = selectedCountyId
      this.$refs.cityDropdownRef.selectedCountyId = selectedCountyId
      this.$refs.cityDropdownRef.getCities()
    },
    setSelectedCityId(selectedCityId) {
      this.advertisementRequest.cityId = selectedCityId
    },
    getAdvertisementTypes() {
      this.$http.get("/type")
          .then(response => {
            this.typeResponse = response.data
          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
    },
    getAdvertisementTools() {
      this.$http.get("/tool")
          .then(response => {
            this.toolResponse = response.data
          })
          .catch(error => {
           router.push({name: 'errorRoute'})
          })
    },
  },
  beforeMount() {
    this.getAdvertisementTypes()
    this.getAdvertisementTools()
  }
}

</script>