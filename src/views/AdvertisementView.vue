<template>
  <AlertDanger :alert-message="errorResponse.message"></AlertDanger>
  <AlertSuccess :alert-message="successMessage"></AlertSuccess>

  <div v-if="isChoresAdding" class="advertisement-view-master">
    <div class="advertisement-chore-header">
      <h4 class="mb-5">Vali Teenused:</h4>
    </div>
    <div class="advertisement-chore-items">
      <table>
        <tr v-for="chore in choreResponse">
          <td>{{chore.choreName}}</td>
          <td>
            <button v-if="!isChoreSelected[chore.choreId - 1]" @click="handleAdvertisementChoreAdd(chore.choreId)" class="btn btn-dark" type="submit">Vali</button>
            <button v-else @click="handleAdvertisementChoreDelete(chore.choreId)" class="btn btn-dark" type="submit">Eemalda</button>
          </td>
        </tr>
      </table>
    </div>
    <div class="advertisement-view-items">
      <button @click="removeAddedAdvertisementAndAdvertisementChores" class="btn btn-dark me-3" type="submit">Katkesta</button>
      <button @click="ValidateAndPushToAdvertisements" class="btn btn-dark" type="submit"> Kinnita</button>
    </div>
  </div>
  <div v-else class="advertisement-view-master">
    <div class="advertisement-view-item1">
      <h2>Lisa kuulutus:</h2>
      <div v-for="type in typeResponse">
        <input v-model="advertisementRequest.typeId" type="radio" name="radio" :id="type.typeName" :value="type.typeId">
        <label :for="type.typeName" class="radio-label">{{type.typeName}}</label>
        <br>
      </div>
    </div>
    <div class="advertisement-view-item2">
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
    <div class="advertisement-view-item3">
      <textarea v-model="advertisementRequest.advertisementDescription" placeholder="Kuulutuse tekst" class="mb-4" cols="50" rows="5"></textarea>
      <div v-for="tool in toolResponse">
        <input v-model="advertisementRequest.toolId" type="radio" name="radio2" :id="tool.toolName" :value="tool.toolId">
        <label :for="tool.toolName" class="radio-label">{{tool.toolName}}</label>
        <br>
      </div>
      <div class="mt-5">
        <router-link to="/dashboard"><button class="btn btn-dark m-3" type="submit">Tagasi</button></router-link>
        <button @click="validateFieldsAndAddAdvertisementToUser" class="btn btn-dark m-3" type="submit">Edasi</button>
      </div>
    </div>
  </div>

</template>

<script>
import router from "@/router";
import CountyDropdown from "@/components/CountyDropdown.vue";
import CityDropdown from "@/components/CityDropdown.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import {ATLEAST_ONE_CHORE_SELECTED, FILL_MANDATORY_FIELDS, NEW_ADVERTISEMENT_ADDED} from "@/assets/script/AlertMessage";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import {useRoute} from "vue-router";


export default {
  name: 'AdvertisementView',
  components: {AlertSuccess, AlertDanger, CityDropdown, CountyDropdown},
  data() {
    return {
      isChoreSelected: [],
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
      choreResponse: [
        {
          choreId: 0,
          choreName: ''
        }
      ],
      advertisementChoreRequest: {
        choreId: 0,
        advertisementId: 0
      },
      advertisementId: 0,
      isChoresAdding: false,
      selectedAdvertisementId: Number(useRoute().query.advertisementId),
      errorResponse: {
        message: '',
        errorCode: 0
      },
      successMessage: ''
    }
  },
  methods: {
    removeAddedAdvertisementAndAdvertisementChores() {
      this.deleteAllAdvertisementChores()
      this.deleteAdvertisement()
      router.push({name: 'dashboardRoute'})
    },

    deleteAdvertisement() {
      this.$http.delete("/advertisement", {
            params: {
              advertisementId: this.selectedAdvertisementId
            }
          }
      ).then(response => {
        const responseBody = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    deleteAllAdvertisementChores() {
      this.$http.delete("/advertisement-chores", {
            params: {
              advertisementId: this.selectedAdvertisementId
            }
          }
      ).then(response => {
        const responseBody = response.data
      }).catch(error => {
       router.push({name: 'errorRoute'})
      })
    },

    ValidateAndPushToAdvertisements() {
      this.resetErrorMessage();
      if (this.atLeastOneChoreSelected) {
        this.successMessage = NEW_ADVERTISEMENT_ADDED;
        setTimeout(() => {
          router.push({name: 'advertisementsRoute'})
        }, 2500);
      } else {
        this.errorResponse.message = ATLEAST_ONE_CHORE_SELECTED
      }
    },

    atLeastOneChoreSelected() {
      return this.isChoreSelected.contains('true')
    },

    handleAdvertisementChoreDelete(choreId) {
      this.isChoreSelected[choreId - 1] = false
      this.$http.delete("/advertisement-chore", {
            params: {
              choreId: choreId,
              advertisementId: this.selectedAdvertisementId
            }
          }
      ).then(response => {
        const responseBody = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })

    },

    handleAdvertisementChoreAdd(choreId) {
      this.isChoreSelected[choreId - 1] = true
      this.advertisementChoreRequest.choreId = choreId
      this.advertisementChoreRequest.advertisementId = this.selectedAdvertisementId
      this.addAdvertisementChore()

    },

    addAdvertisementChore() {
      this.$http.post("/advertisement-chore", this.advertisementChoreRequest
      ).then(response => {
        const responseBody = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    resetErrorMessage () {
      this.errorResponse.message = ''
    },

    validateFieldsAndAddAdvertisementToUser() {
      this.resetErrorMessage();
      if (this.mandatoryFieldsAreFilled()) {
        this.$http.post("/advertisement", this.advertisementRequest
        ).then(response => {
          this.advertisementId = response.data
          router.push({name: 'advertisementRoute', query: {advertisementId: this.advertisementId}})

        }).catch(error => {
          router.push({name: 'errorRoute'})
        });
      } else {
          this.errorResponse.message = FILL_MANDATORY_FIELDS
      }
    },

    mandatoryFieldsAreFilled() {
      return this.advertisementRequest.typeId > 0 &&
          this.advertisementRequest.toolId > 0 &&
          this.advertisementRequest.countyId > 0 &&
          this.advertisementRequest.advertisementPrice > 0 &&
          this.advertisementRequest.advertisementDescription.length > 0
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

    handleIsChoresAdding() {
      this.isChoresAdding = !isNaN(this.selectedAdvertisementId)
    },

    createIsChoreSelectedList() {
      let nrOfChores = this.choreResponse.length;
      for (let i = 0; i < nrOfChores; i++) {
        this.isChoreSelected.push(false)
      }
    },

    getAllChores() {
      this.$http.get("/chore")
          .then(response => {
            this.choreResponse = response.data
            this.createIsChoreSelectedList()
          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
    },
  },
  beforeMount() {
    this.handleIsChoresAdding()
    if (this.isChoresAdding) {
      this.getAllChores()
    } else {
      this.getAdvertisementTypes();
      this.getAdvertisementTools();
    }
  }
}

</script>